import React, {useState} from 'react'

import Classes from 'classnames'

import Style from './styles/Task.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'

import ScrollContainer from 'react-indiana-drag-scroll'


import {ipcRenderer as main} from 'electron';

import {motion, AnimatePresence} from 'framer-motion';
import {SASS_VARIABLES as COLORS} from '../variables'

export function TaskContainer({children}){

    return(
        <div
            ignoreElements="button, input, .ignore-scrolling" 
            className={Style.TaskContainer}
            horizontal={false}
        >
            {children}
        </div>
    )
}

export function Task(props){

    const {
        id,
        variant,
        title,
        color, 
        time, 
        link
    } = props

    const [isActive, toggleStatus] = useState(false);
    const [isTicked, toggleTick] = useState(false);

    return(
        <div 
            className={Classes(
                Style.Task,
                variant==='linked' && Style.Linked,
                variant==='note' && Style.Note,
                (isActive)? Style.active: false,
                (isTicked)? Style.ticked: false
            )}

            onDoubleClick={(e)=>(e.target!=="button") && toggleStatus(!isActive)}
             
            style={{'--color':color}}

        >
            <span className={Style.Background}></span>
            
            <span className={Style.LeftColor}></span>
            
            <div className={Style.ButtonContainer}>
                <AnimatePresence exitBeforeEnter>
                    { isActive
                        ? <Delete state={isTicked} />
                        : <Checkbox state={isTicked} stateUpdate={toggleTick}/>
                    }   
                </AnimatePresence>
            </div>
            
            <div className={Style.TaskNameWrapper}>
                <div className={Style.TaskName}>
                    <hr className={Style.Strikethrough} />
                    {title}
                </div>
            </div>
            
            { variant === "linked" &&       // IF LinkedTask         
                <button
                    className={Classes(
                        Style.Link,
                        link && Style.hasLink,
                    )}
                    onClick = {()=>main.send('execute-link',link)} 
                >
                    <Link />
                </button>
            }

            { variant !== "note" &&         // IF TimelyTask, LinkedTask 
                <span className={Style.TaskTime}>
                    {time}
                </span>
            }

        </div>  
    )
}


function Checkbox({state,stateUpdate=()=>{},onCheck=()=>{},disabled=false}){

    const onClickWrapper = ()=>{
        onCheck();
        stateUpdate(prevState=>!prevState) 
    }

    return(
        <button 
            key="check"
            className={Classes(
                Style.Checkbox,
                state && Style. active
            )}
            onClick={onClickWrapper} disabled={disabled}
        >
            { 
            (state)
                ? <Tick />
                : false
            }
        </button>
    )
}

function Delete({onClick, state}){
    const Variants={
        show:{
            borderColor: COLORS.pink,
            backgroundColor: COLORS.pink,
            transition:{
                duration: .2,
                delay: .3,
                ease: 'easeOut',
                when: 'beforeChildren'
            }
        },
        hidden:{
            borderColor: COLORS.orange,
            backgroundColor: state ? COLORS.orange :'rgba(0,0,0,0)',
            transition:{
                duration: .2,
                ease: 'easeIn',
                when: 'afterChildren'
            }
        }
    }
    return(
        <motion.button 
            key="delete"
            variants={Variants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={Classes(
                Style.Delete,
            )}
            onClick={onClick}
        >
            <Minus />
        </motion.button>
    )   
}


const Minus = ()=>{
    
    const IconVariants={
        hidden:{
            opacity: 0,
            transition:{
                duration: .2,
                ease: 'easeIn',
                delay: .3
            }
        },
        show:{
            opacity: 1,
            transition:{
                duration: .2,
                ease: 'easeOut',
            }
        },
    }
    return(
        <motion.svg 
            variants={IconVariants}
            xmlns="http://www.w3.org/2000/svg" 
            width="15.809" height="11.009" 
            viewBox="0 0 15.809 11.009"
        >
            <path fill="none" stroke="rgb(255,255,255)" strokeLinecap="round" strokeLinejoin="miter" strokeWidth="2" d="M11.1046301 5.5046301h-6.4"/>
        </motion.svg>
    )
}