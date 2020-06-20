const { app, BrowserWindow } = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 440,
    frame:false,
    webPreferences: { webSecurity: false},
  })

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  mainWindow.webContents.openDevTools({mode:'detach'})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
