import React, {useState, useEffect} from 'react'

import Classes from 'classnames'

import Style from './styles/TaskEntry.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'


import {ipcRenderer as main} from 'electron';

import { useElectronState } from '../hooks/useElectronState'

import {motion, useAnimation} from 'framer-motion'

import {useDrag} from 'react-use-gesture'

export function Entry({variant, save=()=>{}, discard=()=>{}}){
    const [name,setName] = useState("")
    const time = useElectronState('time')[0]

    const bindAnimation = useAnimation({
        x: 0,
        transition:{
            type: "spring",
            stiffness: 1,
        }
    })

    const bindDrag = useDrag( ({dragging, movement: [x,y], cancel }) => {
        const X_LIMIT = 50
        if (x > X_LIMIT){
            bindAnimation.start({x: X_LIMIT})
            cancel()
        }
        else if(dragging) {
            if(x < 0) cancel()
            bindAnimation.start({x})
        }
        else
            bindAnimation.start({x:0})
    })

    const spawnTimePicker = (e)=>{

        const viewportRect = document.body.getBoundingClientRect()
        const targetRect = e.target.getBoundingClientRect()

        const offset = {
            x: Math.round(targetRect.left - viewportRect.left - (120)),
            y: Math.round(targetRect.top - viewportRect.top + targetRect.height + 5)
        }
        main.send('spawnPicker','time',offset)
    }
    return(
        <div className={Style.Wrapper}>
        <motion.div 
            className={Classes(
                Style.Entry,
                variant==='linked' && Style.Linked,
                variant==='note' && Style.Note,
            )}
            {...bindDrag()}
            animate = {bindAnimation}
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
        </motion.div>
        </div>
    )
}

function EntryButton({confirm=()=>{},decline=()=>{}}){
    return(
        <button className={Classes(Style.EntryButton,'ignore-scrolling')}>
            <Tick />
        </button>
    )
}


