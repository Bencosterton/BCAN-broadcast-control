const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

let mainWindow;

app.commandLine.appendSwitch('enable-features', 'WebviewTag');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'BCAN.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            nodeIntegrationInSubFrames: true
        }
    });

    mainWindow.loadFile('index.html');

    // app menu
    const template = [
        {
            label: 'File',
            submenu: [
                { role: 'quit' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://bencosterton.github.io/BCAN-broadcast-control/');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Config csv file
function loadConfig() {
    try {
        if (!fs.existsSync('config.csv')) {
            // Create default csv if one cannot be found in root directory
            const defaultContent = stringify([
                ['tabName', 'address'],
                ['BCAN', 'https://github.com/Bencosterton/BCAN-broadcast-control'],
                ['Ben', 'https://github.com/Bencosterton/']
            ]);
            fs.writeFileSync('config.csv', defaultContent);
        }
        
        const content = fs.readFileSync('config.csv', 'utf-8');
        const records = parse(content, {
            columns: true,
            skip_empty_lines: true
        });
        
        return records;
    } catch (error) {
        console.error('Error loading config:', error);
        return [];
    }
}

// Save CSV config file
ipcMain.on('save-config', (event, content) => {
    try {
        fs.writeFileSync('config.csv', content);
        event.reply('save-config-reply', { success: true });
    } catch (error) {
        event.reply('save-config-reply', { success: false, error: error.message });
    }
});

ipcMain.on('get-config', (event) => {
    try {
        const content = fs.readFileSync('config.csv', 'utf-8');
        event.reply('get-config-reply', { success: true, content });
    } catch (error) {
        event.reply('get-config-reply', { success: false, error: error.message });
    }
});

app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});