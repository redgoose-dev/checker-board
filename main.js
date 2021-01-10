const { app, BrowserWindow, Menu, MenuItem } = require('electron');
let win = null;

// create window
function createWindow () {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  win.loadFile('docs/index.html');
  win.on('closed', () => {
    win = null;
  });
}

// disabled security warnings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

// app events
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.on('ready', () => {
  createWindow();

  // context menu
  if (win)
  {
    const context = new Menu();
    context.append(new MenuItem({ role: 'copy' }));
    context.append(new MenuItem({ role: 'paste' }));
    context.append(new MenuItem({ role: 'selectAll' }));
    win.webContents.on('context-menu', (e, params) => {
      if (params.mediaType === 'none' && params.selectionText)
      {
        context.popup(win, params.x, params.y);
      }
    });
  }
});
