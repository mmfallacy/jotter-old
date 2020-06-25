import React, {useState, useEffect, useRef} from 'react'

import Classes from 'classnames'

import Style from './styles/Task.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Minus} from './assets/Task/minus.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'

import {CSSTransition} from 'react-transition-group'

import ScrollContainer from 'react-indiana-drag-scroll'

import {useDrag} from 'react-use-gesture'

import {TweenMax} from 'gsap'

import {ipcRenderer as main} from 'electron'

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
             
            style= {{'--color':color}}

            onDoubleClick={(e)=>(e.target==="button") && toggleStatus(!isActive)}
        >
            <span className={Style.Background}></span>
            
            <span className={Style.LeftColor}></span>
            
            <div className={Style.ButtonContainer}>
                <Checkbox state={isTicked} stateUpdate={toggleTick}/>
                <Delete inProp={isActive} />
            </div>
            
            <div className={Style.TaskNameWrapper}>
                <span className={Style.TaskName}>
                    <hr className={Style.Strikethrough} />
                    {title}
                </span>
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
    const [taskName,setTaskName] = useState("test")
    const self = useRef(null)

    return(
        <div 
            ref={self}
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
                className={Style.TaskName} 
                placeholder="Enter Task Title..."
                value={taskName}
                onChange={(e)=>setTaskName(e.target.value)}
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
                <button className={Style.TaskTime}>
                    12:30AM
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
    const self = useRef(null)
    const bind = useDrag(
        ({down, cancel,canceled, movement:[mx,my]})=>{
            let mapped_my = 0 + (100 - 0) * (my + 30) / 60;
            console.log(mapped_my, my)
            TweenMax.to(self.current, {y:down ? my : 0, backgroundPositionY: down ? mapped_my : 50 })
            
            if(canceled) return
            if(my <-20){
                cancel()
                setTimeout(confirm, 250);

            }
            else if( my > 20){
                cancel()
                setTimeout(decline, 250);
            }
        }, 
    // OPTIONS
        {
            bounds: {left:0,right:0, top: -10, bottom: 10 },
            rubberband: true
        }
    )
    return(
        <div ref={self} {...bind()} className={Classes(Style.EntryButton,'ignore-scrolling')}>
            
        </div>
    )
}