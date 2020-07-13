import React, {useState, useEffect} from 'react'

import Style from './styles/TimePicker.module.scss'
import { useElectronState } from '../hooks/useElectronState'

import moment from 'moment'

import {createMuiTheme, colors} from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import {TimePicker as MuiTimePicker} from '@material-ui/pickers'

import {ipcRenderer as main} from 'electron'

import {SASS_VARIABLES as COLORS} from '../variables'

const overrideTheme= createMuiTheme({
    overrides:{
        MuiPickersStaticWrapper:{
            staticWrapperRoot : {
                backgroundColor: 'transparent'
            }
        },
        MuiPickersToolbar:{
            toolbar:{
                backgroundColor: COLORS.orange
            }
        },
        MuiPickersClockPointer: {
            pointer : {
                backgroundColor: COLORS.orange
            },
            thumb : {
                borderColor: COLORS.orange
            },
            noPoint:{
                backgroundColor: COLORS.orange
            }
        },
        MuiPickersClock : {
            clock:{
                backgroundColor: '#FFFFFF1F'
            },
            pin : {
                backgroundColor: COLORS.orange
            }
        },
        MuiPickersClockNumber : {
            clockNumber : {
                color: '#FFFFFFBB'
            }
        }

    }
})

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
            <ThemeProvider theme={overrideTheme}>
                <MuiTimePicker
                    variant="static"
                    openTo="hours"
                    value={pickerTime}
                    onChange={setPickerTime}
                    onAccept={(date)=>console.log(date.format("h:mm A"))}
                />
            </ThemeProvider>
            <div className={Style.ButtonGroup}>
                <button onClick={onOk}>OK</button>
                <button onClick={onNow}>NOW</button>
                <button onClick={onClose}>CLOSE</button>
            </div>
        </div>
    )
}

