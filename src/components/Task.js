import React, {useState, useEffect} from 'react'

import Classes from 'classnames'

import Style from './styles/Task.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Minus} from './assets/Task/minus.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'

import {CSSTransition} from 'react-transition-group'

import ScrollContainer from 'react-indiana-drag-scroll'

import {ipcRenderer as main} from 'electron'

export function TaskContainer({children}){

    return(
        <ScrollContainer className={Style.TaskContainer}>
            {children}
        </ScrollContainer>
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
             
            style= {{'--color':color}}

            onDoubleClick={(e)=>(e.target==="button") && toggleStatus(!isActive)}
        >
            <span className={Style.Background}></span>
            
            <span className={Style.LeftColor}></span>
            
            <div className={Style.ButtonContainer}>
                <Checkbox state={isTicked} stateUpdate={toggleTick}/>
                <Delete inProp={isActive} />
            </div>

            <span className={Style.TaskName}>
                <hr className={Style.Strikethrough} />
                {title}
            </span>
            
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

export function Entry(){
    return(
        <div 
            className={Style.New}
        >
            <span className={Style.LeftColor}></span>

            <div className={Style.ButtonContainer}>
                <Checkbox disabled/>
            </div>

            <input className={Style.TaskName} placeholder="Enter Task Title...">
            </input>
            <button
                className={Classes(
                    Style.Link
                )}
            >
                <Link />
            </button>
            <button className={Style.TaskTime}>
                12:30AM
            </button>
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
            className={Classes(
                Style.Checkbox,
                state && Style.active
            )}
            onClick={onClickWrapper} disabled={disabled}>
            { 
            (state)
                ? <Tick />
                : false
            }
        </button>
    )
}

function Delete({onClick, inProp}){

    return(
        <CSSTransition
            in={inProp}
            classNames={{
                enterActive:Style.enterActive,
                enterDone:Style.enterDone,
                exitDone:Style.exitDone,
                exit:Style.exitActive
            }}
            timeout={800}
            mountOnEnter
            unmountOnExit
        >
            <button 
                className={Classes(
                    Style.Delete,
                )}
                onClick={onClick}
            >
                    <Minus />
            </button>
        </CSSTransition>
    )
}

