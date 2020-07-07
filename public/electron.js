const { app, BrowserWindow , ipcMain, shell} = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');
const {SetBottomMost} = require('electron-bottom-most')

const {PickerWindow} = require('./modules/ChildWindow')

// DISABLE CACHE
app.commandLine.appendSwitch ("disable-http-cache");

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 434,
    minHeight: 200,
    width: 434,
    height: 476,
    frame:false,
    transparent:true,
    minimizable:false,
    resizable:false, // DEPRECATED RESIZABILITY DUE TO RESIZING BUG
    webPreferences: { webSecurity: false,  nodeIntegration: true},
  })

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  mainWindow.webContents.openDevTools({mode:'detach'})

  let handle = mainWindow.getNativeWindowHandle();

  SetBottomMost(handle)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('execute-link',(event, {type,value})=>{
  console.log(type,value)
  switch(type){
    case 'executable':
      return;
    default:
      shell.openExternal(value)
      return
  }
})

ipcMain.on('spawnPicker',(event, type, offset)=>{
  spawnWindow[type](BrowserWindow.fromWebContents(event.sender), offset)
})

const spawnWindow ={
  time : spawnTimePicker,
  date : ()=>{}
}

function spawnTimePicker(parent, offset){
  const parentPos = parent.getPosition()
  const timePicker = new PickerWindow(
    parent,
    isDev ? 'http://localhost:3000/timepicker' : `file://${path.join(__dirname, '../build/index.html/timepicker')}`,
    {
      width: 300,
      height: 400,
      x: parentPos[0] + offset.x,
      y: parentPos[1] + offset.y,
      resizable:false,
      frame:false,
      transparent:true,
      show:false,
      webPreferences: { webSecurity: false,  nodeIntegration: true},
    })
}








// function spawnTimePicker2(parent, offset){
//   const parentPos = parent.getPosition()
//   console.log(parentPos, offset)
//   let timePicker = new BrowserWindow({
//     width: 300,
//     height: 400,
//     x: parentPos[0] + offset.x,
//     y: parentPos[1] + offset.y,
//     resizable:false,
//     frame:false,
//     transparent:true,
//     parent: parent,
//     show:false,
//     webPreferences: { webSecurity: false,  nodeIntegration: true},
//   })

//   timePicker.loadURL(isDev ? 'http://localhost:3000/timepicker' : `file://${path.join(__dirname, '../build/index.html/timepicker')}`);

//   timePicker.on('ready-to-show', ()=>{
//     timePicker.show()
//     // ASSIGN FOCUS EVENT HANDLER ON PARENT FOCUS
//     parent.once('focus', ()=>{
//       // START EXIT ANIMATION
//       timePicker.webContents.send('start-exit-anim')
//       parent.webContents.send('picker-is-closed')
//       timePicker.on('ready-to-close', ()=>{
//         timePicker.close()
//         timePicker = null
//       })

//     })

//   })
// }
