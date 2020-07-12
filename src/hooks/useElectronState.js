import {useState, useEffect} from 'react'

import {ipcRenderer as main, remote} from 'electron'

export function useElectronState(key){
    const value = remote.getGlobal('ELECTRON_STATES')[key]
    const [state, setState] = useState(value)

    useEffect(()=>{ 
        main.on(`electron-state-update-${key}`, (evt)=>{
            const newValue = remote.getGlobal('ELECTRON_STATES')[key]
            setState(newValue)
        })
    }, [key])
    
    const newSetState = (value)=> {
        console.log(key, value)
        main.send('electron-state-set', key, value)
    }
    return [state, newSetState]
}
