import React, {useEffect, useRef} from 'react'

import Style from './styles/TimePicker.module.scss'

import {ipcRenderer as main} from 'electron'

import {TweenMax, Power3} from 'gsap'


export default function TimePicker(){
    const self = useRef(null)

    useEffect(()=>{
        main.on('start-exit-anim', exitPicker)
    })

    const exitPicker = () => {
        TweenMax.to(self.current, .25, {scale: .9, opacity: 0, onComplete:()=>main.send('ready-to-exit') }, Power3.easeOut)
    }

    return(
        <div ref={self} className={Style.TimePicker}>

        </div>
    )
}

