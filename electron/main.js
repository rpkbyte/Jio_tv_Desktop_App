const { app, BrowserWindow, ipcMain, session, shell, safeStorage } = require('electron');
const path = require('path');

let mainWindow = null;
let encryptedProfileStore = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 840,
    minWidth: 1024,
    minHeight: 680,
    backgroundColor: '#0a0d14',
    title: 'JioTV Desktop',
    icon: path.join(__dirname, '../extracted_resources/ic_launcher_round.webp'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0c1017',
      symbolColor: '#e2e8f0',
      height: 38
    }
  });

  const devUrl = 'http://localhost:5173';
  const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';

  // -------------------------------------------------------------
  // Navigation & External Link Restrictions (Phase 5 Security)
  // -------------------------------------------------------------
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsed = new URL(navigationUrl);
    const isAllowedLocal = 
      (isDev && parsed.origin === 'http://localhost:5173') ||
      (parsed.protocol === 'file:');

    if (!isAllowedLocal) {
      event.preventDefault();
      console.warn(`[Security] Blocked unauthorized in-app navigation to: ${navigationUrl}`);
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const parsed = new URL(url);
      if (['https:', 'http:'].includes(parsed.protocol)) {
        // Safely open allowed external links in the OS default browser
        shell.openExternal(url);
      }
    } catch (e) {
      console.warn('[Security] Invalid window open URL:', e);
    }
    return { action: 'deny' };
  });

  if (isDev) {
    mainWindow.loadURL(devUrl).catch(() => {
      setTimeout(() => mainWindow && mainWindow.loadURL(devUrl), 2000);
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// -------------------------------------------------------------
// App Initialization & Security Configuration
// -------------------------------------------------------------
app.whenReady().then(() => {
  // Block sensitive device permissions by default (camera, mic, geolocation, notifications)
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(false);
  });

  // Strict Content Security Policy Response Header Enforcement
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https:",
      "connect-src 'self' https: blob: http://localhost:* http://127.0.0.1:*",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'"
    ].join('; ');

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp],
        'X-Content-Type-Options': ['nosniff'],
        'X-Frame-Options': ['DENY']
      }
    });
  });

  // -------------------------------------------------------------
  // Validated IPC Handlers (Sender validation & OS Credential Store)
  // -------------------------------------------------------------
  function validateIpcSender(event) {
    if (!mainWindow || event.senderFrame !== mainWindow.webContents.mainFrame) {
      throw new Error('Unauthorized IPC sender: frame origin mismatch');
    }
  }

  ipcMain.handle('auth:get-profile', (event) => {
    validateIpcSender(event);
    if (!encryptedProfileStore) return null;

    try {
      if (safeStorage.isEncryptionAvailable()) {
        const decryptedJson = safeStorage.decryptString(encryptedProfileStore);
        return JSON.parse(decryptedJson);
      } else {
        return JSON.parse(encryptedProfileStore.toString('utf-8'));
      }
    } catch (e) {
      console.warn('[IPC Auth] Error retrieving profile:', e);
      return null;
    }
  });

  ipcMain.handle('auth:save-profile', (event, profile) => {
    validateIpcSender(event);
    if (!profile) return false;

    try {
      const sanitized = {
        subscriberId: String(profile.subscriberId || ''),
        displayName: String(profile.displayName || 'Jio Subscriber'),
        maskedMobile: String(profile.maskedMobile || ''),
        tier: String(profile.tier || ''),
        isAuthenticated: true,
        savedAt: Date.now()
      };
      const jsonStr = JSON.stringify(sanitized);

      if (safeStorage.isEncryptionAvailable()) {
        encryptedProfileStore = safeStorage.encryptString(jsonStr);
      } else {
        encryptedProfileStore = Buffer.from(jsonStr, 'utf-8');
      }
      return true;
    } catch (e) {
      console.warn('[IPC Auth] Error storing profile:', e);
      return false;
    }
  });

  ipcMain.handle('auth:clear-profile', (event) => {
    validateIpcSender(event);
    encryptedProfileStore = null;
    return true;
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
