const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, TouchBar} = electron;
let mainWindow;

const { TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarSlider, TouchBarColorPicker } = TouchBar
//labels
const macbtn1 = new TouchBarButton();
const macbtn2 = new TouchBarButton();
const macbtn3 = new TouchBarLabel();

macbtn1.label = "▶ Play";
macbtn2.label = "Featured";
macbtn3.label = "🐲 Rathumakara FM - Sri Lanka's biggest Online Radio platform 🐲"


const touchBar = new TouchBar({
    items: [
        macbtn1,
        new TouchBarSpacer({ size: 'small' }),
        macbtn2,
        new TouchBarSpacer({ size: 'small' }),
        macbtn3
    ]
  });

app.on('ready',function(){
    mainWindow = new BrowserWindow({webPreferences:{nodeIntegration: true},width:1291,height:950,minHeight:950,minWidth:1291,});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    //Building menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Inserting menu
    Menu.setApplicationMenu(mainMenu);

    //TouchBar
    mainWindow.setTouchBar(touchBar);

});

//MenuConfiguation
const mainMenuTemplate = [
    {
        label:"File",
        submenu: ''
    },
    {
        label: 'About',
        submenu: [{
            label: 'About Rathumakara FM'
        }]
    },
   
];

//Mac Menu Bar handlingh
if(process.platform == "darwin"){
    mainMenuTemplate.unshift({
        label:"File",
        submenu: ''
    });
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev tools',
        submenu: [
            {
                label: 'toggle',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools(); 
                }
            },
            {
                role:'reload'
            }
        ]
    });
}
