const { app, BrowserWindow } = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');

// DISABLE CACHE
app.commandLine.appendSwitch ("disable-http-cache");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 434,
    height: 476,
    frame:false,
    transparent:true,
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
