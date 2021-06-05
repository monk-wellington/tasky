const path = require('path');
const electron = require('electron');

const { app, ipcMain } = electron;
const TimerTray = require('./app/timer-tray');
const MainWindow = require('./app/main-window');

let mainWindow;
let tray;
app.on('ready', () => {
    app.dock.hide();
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `/src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);
});

app.on('quit', () => {
    mainWindow = null;
    tray = null;
});

ipcMain.on('update-timer', (event, time) => {
    tray.setTitle(time);
});
