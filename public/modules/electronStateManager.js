
const {ipcMain, webContents} = require('electron')

const installElectronStateManager = () =>{
    global.ELECTRON_STATES = {}

    ipcMain.on('electron-state-set', (evt, key, value)=>{
        if(!global.ELECTRON_STATES[key]) throw Error("Key not initialized as electron state")
        global.ELECTRON_STATES[key] = value

        webContents.getAllWebContents().forEach((webContent)=>webContent.send(`electron-state-update-${key}`))

    })
}

const createElectronState = (key, initial) =>{
    if(global.ELECTRON_STATES[key]) throw Error("Key already initialized as electron state")
    
    global.ELECTRON_STATES[key] = initial
}

module.exports = {
    createElectronState,
    installElectronStateManager
}