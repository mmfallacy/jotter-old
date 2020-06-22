import React, {useState, useEffect} from 'react'

import Classes from 'classnames'

import Style from './styles/Task.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Minus} from './assets/Task/minus.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'

import {CSSTransition} from 'react-transition-group'

import ScrollContainer from 'react-indiana-drag-scroll'

export function TaskContainer({children}){

    return(
        <ScrollContainer className={Style.TaskContainer}>
            {children}
        </ScrollContainer>
    )
}

export const Task = {
    Timely: TimelyTask,
    Linked: LinkedTask,
    Note: Note
}

function TimelyTask({title, color, time}){
    const [isActive, toggleStatus] = useState(false);
    const [isTicked, toggleTick] = useState(false);

    return(
        <div 
            className={Classes(
                Style.Task,
                (isActive)? Style.active: false,
                (isTicked)? Style.ticked: false
            )} 
            style= {{'--color':color}}
            onDoubleClick={()=>toggleStatus(!isActive)}
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

            <span className={Style.TaskTime}>
                {time}
            </span>
        </div>
    )
}

function LinkedTask({title, color, time, onClickLink}){
    const [isActive, toggleStatus] = useState(false);
    const [isTicked, toggleTick] = useState(false);

    return(
        <div 
            className={Classes(
                Style.Task,
                Style.Linked,
                (isActive)? Style.active: false,
                (isTicked)? Style.ticked: false
            )} 
            style= {{'--color':color}}
            onDoubleClick={()=>toggleStatus(!isActive)}>
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
            <button
                className={Classes(
                    Style.Link,
                    onClickLink && Style.hasLink,
                )}
                onDoubleClick = {(e)=>e.stopPropagation()}
                onClick = {onClickLink} 
            >
                <Link />
            </button>
            <span className={Style.TaskTime}>
                {time}
            </span>
        </div>
    )
}

function Note({title,color}){
    const [isActive, toggleStatus] = useState(false);
    const [isTicked, toggleTick] = useState(false);

    return(
        <div 
            className={Classes(
                Style.Task,
                (isActive)? Style.active: false,
                (isTicked)? Style.ticked: false
            )} 
            style= {{'--color':color}}
            onDoubleClick={()=>toggleStatus(!isActive)}
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
        </div>
    )
}

function Checkbox({state,stateUpdate,onCheck=()=>{}}){

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
            onClick={onClickWrapper}>
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
                onDoubleClick = {(e)=>e.stopPropagation()}
            >
                    <Minus />
            </button>
        </CSSTransition>
    )
}

