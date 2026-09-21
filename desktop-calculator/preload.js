const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopAPI', {
  hideWindow: () => ipcRenderer.send('hide-window'),
  quitApp: () => ipcRenderer.send('quit-app'),
  resizeToFit: (size) => ipcRenderer.send('resize-to-fit', size),
  onFocusExpression: (callback) => {
    ipcRenderer.on('focus-expression', () => callback());
  }
});
