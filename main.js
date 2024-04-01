const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "ChartLinkApp",
    icon: "image.ico", // Provide the path to your icon file

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Consider security implications of your Electron version
    },
  });

  // Load the URL
  win.loadURL('https://52.77.27.181/logs'); // Pointing to the dev server
}

// This will catch certificate errors for any window in your app
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://52.77.27.181/logs') { // Change this to your URL
    // Ignore certificate errors
    event.preventDefault();
    callback(true);
  } else {
    callback(false); // For other URLs, don't ignore certificate errors
  }
});

// Create the window only after Electron has initialized
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window in the app when the dock icon is clicked and there are no other windows open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
