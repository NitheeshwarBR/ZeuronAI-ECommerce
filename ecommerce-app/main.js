// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile('views/signup.html'); // This points to the welcome page
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC handlers for signup and login
ipcMain.handle('signup', async (event, username, password) => {
    try {
        const response = await axios.post('http://localhost:3001/auth/signup', { username, password });
        return response.data;
    } catch (error) {
        return { error: error.response.data.error };
    }
});

ipcMain.handle('login', async (event, username, password) => {
    try {
        const response = await axios.post('http://localhost:3001/auth/login', { username, password });
        return response.data;
    } catch (error) {
        return { error: error.response.data.error };
    }
});
