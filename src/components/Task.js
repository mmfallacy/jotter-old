import React, {useState} from 'react'

import Classes from 'classnames'

import Style from './styles/Task.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Minus} from './assets/Task/minus.svg'

import {CSSTransition} from 'react-transition-group'

import ScrollContainer from 'react-indiana-drag-scroll'

export function TaskContainer({children}){


    return(
        <ScrollContainer className={Style.TaskContainer}>
            {children}
        </ScrollContainer>
    )
}


export function TimelyTask({title, time}){
    const [isActive, toggleStatus] = useState(false);
    const [isTicked, toggleTick] = useState(false);
    
    return(
        <div 
            className={Classes(
                Style.Task,
                (isActive)? Style.active: false,
                (isTicked)? Style.ticked: false
            )} 
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

            <span className={Style.TaskTime}>
                {time}
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

