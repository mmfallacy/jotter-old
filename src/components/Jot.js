import React, {useState, useEffect} from 'react'

import Style from './styles/Jot.module.scss'

import {ReactComponent as Add} from './assets/Jot/add.svg'

import {ButtonGroup, Secondary} from './RadiallyPositionedButton';

import {TaskContainer, Task, Entry} from './Task';

import moment from "moment";

import useInterval from '@use-it/interval'

import {DATE_TEXT} from '../variables'

import {ipcRenderer as main} from 'electron'

export default function Jot(){

    const [taskArray, setTaskArray] = useState([
        {type:"timely", color:'#FF5151', title:"A random timely task A random timely task A random timely task A random timely task", time:"12:30 AM"},
        {type:"linked", color:'green', title:"Link31232131232132131231ed Placeholder", link:{type:'site', value:'https://github.com'},time:"1:30 AM"},
        {type:"note", color:'black', title:"Sample Note", time:"2:30 AM"}
    ])

    const [newTask, setNewTask] = useState(null)
    const [currentMonth, setMonth] = useState(moment().month())
    const [currentWeekday, setWeekday] = useState(moment().day())
    const [currentDay, setDay] = useState(moment().date())


    useInterval(()=>{
        let now = moment()
        setMonth(now.month())
        setWeekday(now.day())
        setDay(now.date())

    },1000)


    useEffect(()=>{

    }, [])
    return(
        <div className={Style.Jot}>
            <div className={Style.Header}>
                <div className={Style.Row}>
                    <h4 className={Style.Weekday}>
                        {DATE_TEXT.WEEKDAYS[currentWeekday]}
                    </h4> &nbsp;&nbsp; 
                    <h4 className={Style.Day}>
                        {DATE_TEXT.ORDINAL_DAYS(currentDay)}
                    </h4>
                </div>
                <h6>{DATE_TEXT.MONTHS[currentMonth]}</h6>

                
                <ButtonGroup className={Style.ButtonGroup} 
                    primary={{
                        className: Style.Primary,
                        content:
                            <Add />
                    }}
                    duration={.2}
                    delay={.15}
                >
                    <Secondary onClick={()=>setNewTask({type:"timely"})} className={Style.Secondary} angle={80} distance={50}>
                        <Add />
                    </Secondary>
                    
                    <Secondary className={Style.Secondary} angle={135} distance={50}>
                        <Add />
                    </Secondary>
                    
                    <Secondary className={Style.Secondary} angle={190} distance={50}>
                        <Add />
                    </Secondary>
                </ButtonGroup>
            </div>

            
            <TaskContainer>
                { taskArray.map(({type, ...taskInfo}, i)=>
                        <Task variant={type} {...taskInfo} />
                  )
                }
                { newTask && <Entry type={newTask.type} stateMethod={setNewTask} onSubmit={(task)=>setTaskArray({...taskArray, task})}/> }
            </TaskContainer>
        </div>
    )
}