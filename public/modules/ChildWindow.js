
const {BrowserWindow, ipcMain} = require('electron');

class ChildWindow{
    constructor(parent, url, options){
        this.window = new BrowserWindow({
            ...options,
            parent,
        })

        this.window.loadURL(url)


    }
}

class PickerWindow extends ChildWindow{
    constructor(parent, url, options){
        super(parent, url, options);

        this.parent = parent

        this.parent.webContents.executeJavaScript("document.getElementById('root').style = 'pointer-events:none; filter: brightness(50%);'");

        this.window.on('ready-to-show', ()=>{

            this.window.show()

            // ASSIGN FOCUS EVENT HANDLER ON PARENT FOCUS

            const closeWindow = () =>{
                this.parent.webContents.executeJavaScript("document.getElementById('root').style = 'pointer-events:auto; filter: none;'");
                
                if(!this.window) return
                this.window.close()
                this.window = null
            }
            
            this.parent.once('focus', closeWindow)

            ipcMain.once('close-picker', closeWindow)

          })
    }

    get isDestroyed(){
        return (!this.window)
    }

}

module.exports = {
    PickerWindow,
    ChildWindow
}