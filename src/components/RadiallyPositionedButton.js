import React, {useState, useRef} from 'react';
import Classes from 'classnames'
import Style from './styles/RadiallyPositionedButton.module.scss'

import {motion, AnimatePresence} from 'framer-motion'

export function ButtonGroup({className, primary, children, duration}){
    const [primaryStatus, togglePrimaryStatus] = useState(false)
    
    const primaryRef = useRef(null)

    const onPrimaryClick = ()=>{
        togglePrimaryStatus(state=>!state)
    }

    const disablePrimaryOnBlur = (e)=>{
        if(primaryStatus && !(primaryRef.current.contains(e.target) || e.target===primaryRef.current))
            togglePrimaryStatus(false)
    }

    const DefaultVariant = {
        transition: {delayChildren: .2, staggerChildren: .1}
    }
    const ContainerVariant = {
        hidden: {
            transition: {...DefaultVariant.transition, staggerDirection: -1}
        },
        show: {
            transition: {...DefaultVariant.transition, staggerDirection: 1}
        }
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

            <motion.div
                initial="hidden"
                animate={primaryStatus? 'show' : 'hidden'}
                variants={ContainerVariant} 
                className={Style.SecondaryWrapper}
            >{
                React.Children.map(children, (child,i)=> // pass props
                    React.cloneElement(child, {duration})
                )
            }</motion.div>


            <AnimatePresence>
                { primaryStatus &&
                <motion.div 
                    className={Style.Overlay}
                    animate={{opacity:1}}
                    initial={{opacity:0}}
                    exit={{opacity:0}}
                ></motion.div>}
            </AnimatePresence>
        </div>
    )
} 

export const Secondary = ({onClick=()=>{}, angle, distance, duration, children, className}) => {
    
    const radians = angle * Math.PI/180

    const Variant = {
        hidden:{
            x: 0,
            y: 0
        },
        show:{
            x:(distance * Math.cos(radians)),
            y:(distance * Math.sin(radians))
        }
    }
    return (
        <motion.button
            variants={Variant}
            onClick={()=>onClick()} 
            className={Classes(Style.Secondary, className)}
            transition={{ease:'easeOut', duration}}
        >
            {children}
        </motion.button>
    )
}
