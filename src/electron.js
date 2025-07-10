const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = !app.isPackaged; // Check if running in development mode

// Disable default menu
Menu.setApplicationMenu(null);

function createWindow() {
  const win = new BrowserWindow({
    width: 1350,
    height: 650,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '..', './public', 'favicon.ico'), // Set window/taskbar icon
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // Load app in dev or prod mode
  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

app.whenReady().then(createWindow);

// Load app in dev or prod mode
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
