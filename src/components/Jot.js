import React, {useState} from 'react'

import Style from './styles/Jot.module.scss'

import {ReactComponent as Add} from './assets/Jot/add.svg'

import {ButtonGroup, Secondary} from './RadiallyPositionedButton';

import {TaskContainer, TimelyTask} from './Task';


export default function Jot(){

    const [taskArray, setTaskArray] = useState([
        {type:"timely", title:"A random timely task A random timely task A random timely task A random timely task", time:"12:30 AM"},
        {type:"linked", title:"Hi", time:"1:30 AM"},
        {type:"note", title:"Sample Note", time:"2:30 AM"}
    ])


    return(
        <div className={Style.Jot}>
            <div className={Style.Header}>
                <div className={Style.Row}>
                    <h4 className={Style.Weekday}>Monday</h4> &nbsp;&nbsp; 
                    <h4 className={Style.Day}>14th</h4>
                </div>
                <h6>June</h6>

                
                <ButtonGroup className={Style.ButtonGroup} 
                    primary={{
                        className: Style.Primary,
                        content:
                            <Add />
                    }}
                    duration={.2}
                    delay={.15}
                >
                    <Secondary className={Style.Secondary} angle={80} distance={50}>
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
                {taskArray.map(({type, ...taskInfo}, i)=>{
                        switch (type) {
                            case 'timely':
                                return <TimelyTask key={i} {...taskInfo} />
                            case 'linked':
                                return <TimelyTask key={i} title="Linked Placeholder" />
                            default :
                                return <TimelyTask key={i} title="Note Placeholder" />
                        }
                    })
                }
            </TaskContainer>
        </div>
    )
}