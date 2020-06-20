import React, {useState, useRef, createRef, useEffect} from 'react';
import Classes from 'classnames'
import Style from './styles/RadiallyPositionedButton.module.scss'

import {TweenMax} from 'gsap'

export function ButtonGroup({className, primary, children, duration, delay}){
    const [primaryStatus, togglePrimaryStatus] = useState(false)
    
    const onPrimaryClick = ()=>{
        togglePrimaryStatus(!primaryStatus)
    }

    return(
        <div className={Classes(Style.ButtonGroup,className)}>

            <button 
                className={Classes(Style.Primary, primary.className)} 
                onClick={onPrimaryClick}
            >
                {primary.content}
            </button>


            {
            (primaryStatus)
            ? React.Children.map(children, (child,i)=>
                React.cloneElement(child, {
                    duration: ( duration || undefined ),
                    delay: ( delay || undefined ),
                    indexes: [ i, children.length-i-1 ]
                })
            )
            :false
            }

            {(primaryStatus)
            ? <div className={Style.Overlay}></div>
            :false
            }
        </div>
    )
} 

export const Secondary = ({indexes, duration=.4, angle=0, distance=50, delay=.5, children, className}) => {
    
    const radians = angle * Math.PI/180
    const self = useRef(null)
    useEffect(()=>{
        // On Mount
            console.log(self)
            TweenMax.to(self.current, duration, {
                x:(distance * Math.cos(radians)),
                y:(distance * Math.sin(radians)),
                 delay:indexes[0]*delay
            })

        // On Dismount
        return ()=>{
            console.log("UNMOUNT")

        }
    },[distance,duration,radians,indexes,self.current])
    
    return (
        <button ref={self} className={Classes(Style.Secondary, className)}>{children}</button>
    )
}
