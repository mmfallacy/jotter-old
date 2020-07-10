import React, {useEffect, useRef} from 'react'

import Style from './styles/TimePicker.module.scss'

import {ipcRenderer as main} from 'electron'

import {TweenMax, Power3} from 'gsap'


export default function TimePicker(){
    const self = useRef(null)

    return(
        <div ref={self} className={Style.TimePicker}>

        </div>
    )
}

