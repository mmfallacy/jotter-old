import React, {useState, useEffect} from 'react'

import Style from './styles/TimePicker.module.scss'
import { useElectronState } from '../hooks/useElectronState'

import moment from 'moment'

import {TimePicker as MuiTimePicker} from '@material-ui/pickers'

import {ipcRenderer as main} from 'electron'

export default function TimePicker(){
    const [time, setTime] = useElectronState('time')
    const [pickerTime, setPickerTime] = useState(moment())

    const onOk = () =>{
        setTime(pickerTime.format('h:mm A'))
        main.send('close-picker')
    }

    const onClose = () =>{
        main.send('close-picker')
    }

    const onNow = () =>{
        setPickerTime(moment())
    }


    return(
        <div className={Style.TimePicker}>
            <MuiTimePicker
                variant="static"
                openTo="hours"
                value={pickerTime}
                onChange={setPickerTime}
                onAccept={(date)=>console.log(date.format("h:mm A"))}
            />
            <div className={Style.ButtonGroup}>
                <button onClick={onOk}>OK</button>
                <button onClick={onNow}>NOW</button>
                <button onClick={onClose}>CLOSE</button>
            </div>
        </div>
    )
}

