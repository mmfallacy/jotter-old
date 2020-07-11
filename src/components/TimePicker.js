import React from 'react'

import Style from './styles/TimePicker.module.scss'

import { TimePickerConsumer } from './context/TimePickerContext'


export default function TimePicker(){

    useEffect(()=>{
        main.on('start-exit-anim', exitPicker)
    })

    const exitPicker = () => {
        TweenMax.to(self.current, .25, {scale: .9, opacity: 0, onComplete:()=>main.send('ready-to-exit') }, Power3.easeOut)
    }

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

