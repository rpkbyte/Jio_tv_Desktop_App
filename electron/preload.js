const { contextBridge, ipcRenderer } = require('electron');

/**
 * Minimal, typed Preload API exposed via contextBridge.
 * Strict context isolation and nodeIntegration disabled are enforced.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.versions.electron,
  
  // Secure subscriber session bridge (tokens remain in Main process safeStorage)
  getAuthProfile: () => ipcRenderer.invoke('auth:get-profile'),
  saveSecureAuthProfile: (profile) => ipcRenderer.invoke('auth:save-profile', profile),
  clearSecureAuthProfile: () => ipcRenderer.invoke('auth:clear-profile')
});
