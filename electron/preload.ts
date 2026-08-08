import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('custor', {
  minimize: () => ipcRenderer.send('assistant:minimize'),
  close: () => ipcRenderer.send('assistant:close'),
  onShow: (callback: () => void) => ipcRenderer.on('assistant:show', callback),
  onMini: (callback: () => void) => ipcRenderer.on('assistant:mini', callback),
  onMinimize: (callback: () => void) => ipcRenderer.on('assistant:minimize', callback)
});
