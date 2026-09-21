const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray, nativeImage, screen } = require('electron');
const path = require('path');

let win = null;
let tray = null;
let quitting = false;

const TRAY_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEK0lEQVR4nO2ZW0wUVxzGv9kFdmBdV1BYGkHFFUyMFVGKSkhrNHhHEdzE8OBLbe1Dm5pYFdGUCKlWG9MYfdB4eWhSTWBBMEoMXgCVICIaG0WlCRcREAsYCRGW3Z3pQ5Omw1lqlj0zf43ze9vvnDnnmy/nzP7PjJC4+wcZHzEGagPU6AFQG6BGD4DaADV6ANQGqNEDoDZAjR4AtQFq9ACoDVCjB0BtgBo9AGoD1OgBUBugJojnYOHmMGQnJyE13o64KVNgEUUEGZUZ55w4g6bObp7TBgS3AJLjpuPXHAcsoshrSE3gsgUsoogjmzd9cDcPcApg2ZzZsIaF8hhKc7hsgXhblE89z1mGqifPMDTi5jGNKnAJIMwUwmiSJKPi4SMew6uKMN4vQ1kLk/Bj5lq/rvmj4wXE4BAkRCtXzOCwC9nHTqJnYIC5ZvOiz5C7biWjH79WjdM1t/0z7QNN6wBJlpFbXAqX26PQJ4gm5G9kw4yNiMD2lcsYvbGtHWdv1nLxpHkh1PKqF0euXGX01Fl2ZCUn/fvbIAgozM6AGBys6DcwNIy84nJIMp9PmiSVYNHdRlQ/aWb0HavSEW21AgC2pC3G/GmxTJ/9ZZd8bpXxMu5nwH/Jz1yHjQvnKzRJkrEg/6cxr7GGhcL57deItFgUen1LK36pqMS5b7YiJMioaCu99wAF5ZcDtauA7Czw5u0Q9jkvYvRKXjQzDme+3MLcfOtffThcUcndB+lhqL6lFb/V1jG6NVRZVLm9XuQWl2LYzb+eID8NHrtWhaau/z8cHa28gWfdParMTx6AxythT/EFeCXJZ/v99uf4va5etfnJAwCA5BkzYDT4thJvi4JtolW1uckDiIucjJ1r0sdst4giDjg2wGAQVJmfNIBgoxE/O7KYYmc0C6ZPw1dfpKnigTSA7SuWY/YnNoXm8Uqoefon03fb0s8xLzaGuweyAFJn2ZGzJIXRT1TdxK6iErT19il0g0HAQUcmzCYTVx8kAUSYzSjMXg9h1LZ+9KILZ2/VwuX2IM9ZxvwzTA2fhL0Zq7l60TwAQQAKstZj8gSzQne5PdhXUg5J+qc0bOrsxqlq9ri7JnEu1iZ+ys2P5gHkLElBWoKd0Y9evc4s+1M1t/G4s4vpm5exCjHh4Vz8aBpAQrQN36cvZ/SG1jacv9PA6F5Jwl5nOVMCm00mHHBkjlk7+APX7wLvovllD1L2H/TrmrbePiwuOKSSI46vxUczpMLBRQ0CWgEhQUbMi41BavxMpq1vcDCQoTXD7wBKvtsGe1TkO/vdb38+LkNao8pDUJJknKtjH2rvI9wfgiMeLwovXkbzS3XO77wJOABZBt6OuNDR/xoNLe0outuIjv5+Ht40gctL0Q8Z8vcB1OgBUBugRg+A2gA1egDUBqjRA6A2QI0eALUBaj76AP4GD7MdIjFvYoQAAAAASUVORK5CYII=';

function placeNearCursor() {
  if (!win) return;
  const cursor = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(cursor);
  const work = display.workArea;
  const [w, h] = win.getSize();
  const x = Math.max(work.x, Math.min(cursor.x - Math.round(w / 2), work.x + work.width - w));
  const y = Math.max(work.y, Math.min(cursor.y - 80, work.y + work.height - h));
  win.setPosition(x, y, false);
}

function showWindow() {
  if (!win) return;
  placeNearCursor();
  win.show();
  win.focus();
  win.setAlwaysOnTop(true, 'floating');
  win.webContents.send('focus-expression');
}

function hideWindow() {
  if (win) win.hide();
}

function toggleWindow() {
  if (!win) return;
  if (win.isVisible()) hideWindow();
  else showWindow();
}

function createWindow() {
  win = new BrowserWindow({
    width: 412,
    height: 540,
    useContentSize: true,
    resizable: false,
    maximizable: false,
    minimizable: true,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    show: false,
    skipTaskbar: false,
    title: 'Statics Calculator',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile('index.html');

  win.once('ready-to-show', () => showWindow());

  win.on('close', (event) => {
    if (quitting) return;
    event.preventDefault();
    hideWindow();
  });

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('before-input-event', (event, input) => {
    if (input.alt && !input.control && !input.meta && String(input.key || '').toLowerCase() === 'c') {
      event.preventDefault();
    }
  });
}

function createTray() {
  const icon = nativeImage.createFromDataURL(TRAY_ICON).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip('Statics Calculator · Alt+C');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open calculator', click: showWindow },
    { label: 'Hide calculator', click: hideWindow },
    { type: 'separator' },
    { label: 'Quit', click: () => { quitting = true; app.quit(); } }
  ]));
  tray.on('double-click', showWindow);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => showWindow());

  app.whenReady().then(() => {
    createWindow();
    createTray();

    const registered = globalShortcut.register('Alt+C', toggleWindow);
    if (!registered) {
      console.warn('Could not register Alt+C. Another app may already be using it.');
    }

    ipcMain.on('hide-window', hideWindow);
    ipcMain.on('quit-app', () => {
      quitting = true;
      app.quit();
    });
  });
}

app.on('activate', showWindow);
app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', (event) => {
  event.preventDefault();
});
