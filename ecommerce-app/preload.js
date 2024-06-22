// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    signup: (username, password) => ipcRenderer.invoke('signup', username, password),
    login: (username, password) => ipcRenderer.invoke('login', username, password),
});
