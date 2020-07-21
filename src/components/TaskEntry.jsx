import React, {useState} from 'react'

import Classes from 'classnames'

import Style from './styles/TaskEntry.module.scss'

import {ReactComponent as Tick} from './assets/Task/tick.svg'
import {ReactComponent as Link} from './assets/Task/link.svg'


import {ipcRenderer as main} from 'electron';

import { useElectronState } from '../hooks/useElectronState'


export function Entry({variant, save=()=>{}, discard=()=>{}}){
    const [name,setName] = useState("")
    const [time, setTime] = useElectronState('time')
    

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

function EntryButton({confirm=()=>{},decline=()=>{}}){
    return(
        <button className={Classes(Style.EntryButton,'ignore-scrolling')}>
            <Tick />
        </button>
    )
}


