const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;

let win;

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    win.on('closed', () => {
        win = null;
    });

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Adjust Notification Value'
                },
                {
                    label: 'View Source',
                    click() {
                        shell.openExternal('https://github.com/r-dog/crypto-alert');
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
            ]
        }
    ])

    Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('active', () => {
    if(win === null){
        createWindow()
    }
});