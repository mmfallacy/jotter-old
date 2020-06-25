import React, {useState, useRef} from 'react';
import Classes from 'classnames'
import Style from './styles/RadiallyPositionedButton.module.scss'

import {TweenLite, Power3} from 'gsap'

import {
    Transition,
    TransitionGroup,
    CSSTransition
} from 'react-transition-group';

export function ButtonGroup({className, primary, children, duration, delay}){
    const [primaryStatus, togglePrimaryStatus] = useState(false)
    
    const primaryRef = useRef(null)

    const onPrimaryClick = ()=>{
        togglePrimaryStatus(state=>!state)
    }

    const disablePrimaryOnBlur = (e)=>{
        if(primaryStatus && !(primaryRef.current.contains(e.target) || e.target===primaryRef.current))
            togglePrimaryStatus(false)
    }

    return(
        <div className={Classes(Style.ButtonGroup,className)} onClick={disablePrimaryOnBlur}>

            <button 
                ref={primaryRef}
                className={Classes(Style.Primary, primary.className)} 
                onClick={onPrimaryClick}
            >
                {primary.content}
            </button>

            <TransitionGroup component={null}>
                {React.Children.map(children, (child,i)=> // pass props
                    React.cloneElement(child, {
                        visible: primaryStatus,
                        duration: ( duration || undefined ),
                        delay: ( delay || undefined ),
                        indexes: [ i, children.length-i-1 ],
                        
                    })
                )}
            </TransitionGroup>

            <CSSTransition
                in={primaryStatus}
                classNames={{
                    enterActive:Style.enterActive,
                    enterDone:Style.enterDone,
                    exitDone:Style.exitDone,
                    exit:Style.exitActive
                }}
                timeout={500}
                mountOnEnter
                unmountOnExit
            >
                <div className={Style.Overlay}></div>
            </CSSTransition>
        </div>
    )
} 

export const Secondary = ({onClick=()=>{},indexes, visible, duration=.4, angle=0, distance=50, delay=.5, children, className}) => {
    
    const radians = angle * Math.PI/180

    const aOnEnter = (el)=>{
        TweenLite.to(el, duration, {
            x:(distance * Math.cos(radians)),
            y:(distance * Math.sin(radians)),
             delay: indexes[0] * delay
        }, Power3.easeOut)
    }

    const aOnExit = (el)=>{
        TweenLite.to(el, duration, {
            x:0,
            y:0,
             delay: indexes[0] * delay
        }, Power3.easeIn)

    }

    return (
        <Transition 
            key={indexes[0]}
            in={visible}
            onEnter={aOnEnter}
            onExit={aOnExit}
            timeout={{
                enter:((duration + indexes[0] * delay) * 1000), 
                exit:((duration + .2 + indexes[1] * delay) * 1000) // add 200ms to wait for animation to end
            }}
            mountOnEnter
            unmountOnExit
        >
            <button onClick={()=>onClick()} className={Classes(Style.Secondary, className)}>{children}</button>
        </Transition>
    )
}
