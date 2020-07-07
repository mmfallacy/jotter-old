import React, {useState} from 'react'

import Classes from 'classnames'

import Style from './styles/Task.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Minus} from './assets/Task/minus.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'

import {CSSTransition} from 'react-transition-group'

import ScrollContainer from 'react-indiana-drag-scroll'


import {ipcRenderer as main} from 'electron';

import moment from 'moment';


export function TaskContainer({children}){

    return(
        <ScrollContainer ignoreElements="button, input, .ignore-scrolling" className={Style.TaskContainer}>
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

            onDoubleClick={(e)=>(e.target!=="button") && toggleStatus(!isActive)}
             
            style={{'--color':color}}

        >
            <span className={Style.Background}></span>
            
            <span className={Style.LeftColor}></span>
            
            <div className={Style.ButtonContainer}>
                <Checkbox state={isTicked} stateUpdate={toggleTick}/>
                <Delete inProp={isActive} />
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

export function Entry({variant, save=()=>{}, discard=()=>{}}){
    const [name,setName] = useState("")
    const [time,setTime] = useState(moment().format("h:mm A"))

    const spawnTimePicker = (e)=>{
        
        const viewportRect = document.body.getBoundingClientRect()
        const targetRect = e.target.getBoundingClientRect()

        const offset = {
            x: Math.round(targetRect.left - viewportRect.left),
            y: Math.round(targetRect.top - viewportRect.top + targetRect.height)
        }
        main.send('spawnPicker','time',offset)
    }

    return(
        <div 
            className={Classes(
                Style.Entry,
                variant==='linked' && Style.Linked,
                variant==='note' && Style.Note,
            )}
        >
            <span className={Style.LeftColor}></span>

            <div className={Style.ButtonContainer}>
                <EntryButton confirm={save} decline={discard}/>
            </div>
                
                
            <input 
                type="text"
                className={Classes(Style.TaskName, Style.TaskNameWrapper)} 
                placeholder="Enter Task Title..."
                value={name}
                onChange={(e)=>setName(e.target.value)}
            >
            </input>
            
            {  variant==='linked' &&
                <button
                    className={Classes(
                        Style.Link
                    )}
                >
                    <Link />
                </button>
            }
            { variant!=='note' &&
                <button 
                    className={Style.TaskTime}
                    onClick={spawnTimePicker}
                >
                    {time}
                    <span className={Style.TaskTimeSet}> SET </span>
                </button>
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

function EntryButton({confirm=()=>{},decline=()=>{}}){
    return(
        <button className={Classes(Style.EntryButton,'ignore-scrolling')}>
            <Tick />
        </button>
    )
}

