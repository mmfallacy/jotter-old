import React from 'react'

import Style from './styles/TimePicker.module.scss'

import { TimePickerConsumer } from './context/TimePickerContext'


export default function TimePicker(){

    return(
        <TimePickerConsumer>
        {
            ({time, setTime})=>
            <div className={Style.TimePicker}>
            </div>
            }
        </TimePickerConsumer>
    )
}

