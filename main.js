const {app, BrowserWindow, Menu} = require("electron")
const { spawn } = require('child_process')
var pyshell =  require('python-shell');
require('electron-reload')(__dirname)

function createWindow(){
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        /*resizable: false,
        webPreferences: {
            nodeIntegration: true
        }*/
        })

        mainWindow.loadFile('src/ui/index.html')
        /*mainWindow.webContents.openDevTools()*/

        let menu =Menu.buildFromTemplate([
            {
                label:"File",
                submenu:[
                    {label:'Exit',
                    click(){
                        app.quit()
                    }
                    }
                ]
            }]
        )
    Menu.setApplicationMenu(menu)


}


app.whenReady().then(() => {
    pyshell.PythonShell.run('main.py',  function  (err, results)  {
        if  (err)  console.log(err);
    });
    createWindow()
})

/*app.whenReady().then(
    spawn("python", ["./backend/main.py"]),
    createWindow)

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow()
    }
})*/
