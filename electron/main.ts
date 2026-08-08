import { app, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron';
import path from 'node:path';

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;
let miniWindow: BrowserWindow | null = null;

function createGlassWindow(width: number, height: number, mini = false) {
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
  return new BrowserWindow({
    width,
    height,
    x: Math.round((sw - width) / 2),
    y: mini ? 40 : Math.round(sh * 0.68),
    frame: false,
    transparent: true,
    resizable: !mini,
    alwaysOnTop: true,
    hasShadow: false,
    backgroundColor: '#00000000',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false }
  });
}

async function load(win: BrowserWindow) {
  if (isDev) await win.loadURL('http://localhost:5173');
  else await win.loadFile(path.join(__dirname, '../dist/index.html'));
}

async function createWindows() {
  mainWindow = createGlassWindow(980, 430);
  miniWindow = createGlassWindow(430, 86, true);
  await Promise.all([load(mainWindow), load(miniWindow)]);
  miniWindow.hide();
  mainWindow.on('closed', () => { mainWindow = null; });
  miniWindow.on('closed', () => { miniWindow = null; });
}

function toggleAssistant() {
  if (!mainWindow || !miniWindow) return;
  if (mainWindow.isVisible()) {
    mainWindow.webContents.send('assistant:minimize');
    setTimeout(() => { mainWindow?.hide(); miniWindow?.show(); miniWindow?.webContents.send('assistant:mini'); }, 220);
  } else {
    miniWindow.hide();
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.send('assistant:show');
  }
}

app.whenReady().then(async () => {
  await createWindows();
  globalShortcut.register('CommandOrControl+Alt+S', toggleAssistant);
});

ipcMain.on('assistant:minimize', toggleAssistant);
ipcMain.on('assistant:close', () => app.quit());

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', (e) => e.preventDefault());
