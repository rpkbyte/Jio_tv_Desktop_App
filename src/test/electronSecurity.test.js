import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainPath = path.resolve(__dirname, '../../electron/main.js');
const preloadPath = path.resolve(__dirname, '../../electron/preload.js');
const htmlPath = path.resolve(__dirname, '../../index.html');

console.log('🧪 Starting Electron Security Architecture Audit Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------
// Test 1: Electron webPreferences Security Flags
// -------------------------------------------------------------
test('electron/main.js enforces contextIsolation, disables nodeIntegration, and enables sandbox', () => {
  const mainContent = fs.readFileSync(mainPath, 'utf-8');

  assert.ok(
    mainContent.includes('contextIsolation: true'),
    'contextIsolation must be explicitly set to true'
  );
  assert.ok(
    mainContent.includes('nodeIntegration: false'),
    'nodeIntegration must be explicitly disabled'
  );
  assert.ok(
    mainContent.includes('sandbox: true'),
    'sandbox must be explicitly enabled'
  );
  assert.ok(
    mainContent.includes('webSecurity: true'),
    'webSecurity must be enabled'
  );
  assert.ok(
    mainContent.includes('allowRunningInsecureContent: false'),
    'allowRunningInsecureContent must be explicitly false'
  );
});

// -------------------------------------------------------------
// Test 2: Navigation & External Window Lockdown
// -------------------------------------------------------------
test('electron/main.js enforces will-navigate and setWindowOpenHandler lockdown', () => {
  const mainContent = fs.readFileSync(mainPath, 'utf-8');

  assert.ok(
    mainContent.includes("webContents.on('will-navigate'"),
    'Must attach will-navigate handler to block arbitrary in-app navigation'
  );
  assert.ok(
    mainContent.includes('setWindowOpenHandler'),
    'Must define setWindowOpenHandler to prevent unauthorized popup windows'
  );
  assert.ok(
    mainContent.includes("action: 'deny'"),
    'Must deny arbitrary window creation'
  );
  assert.ok(
    mainContent.includes('shell.openExternal'),
    'Must safely delegate external web links to the OS browser'
  );
});

// -------------------------------------------------------------
// Test 3: Permission Request Lockdown
// -------------------------------------------------------------
test('electron/main.js blocks sensitive device permissions by default', () => {
  const mainContent = fs.readFileSync(mainPath, 'utf-8');

  assert.ok(
    mainContent.includes('setPermissionRequestHandler'),
    'Must configure setPermissionRequestHandler'
  );
  assert.ok(
    mainContent.includes('callback(false)'),
    'Must reject sensitive device permissions'
  );
});

// -------------------------------------------------------------
// Test 4: IPC Sender Validation & safeStorage
// -------------------------------------------------------------
test('electron/main.js enforces IPC sender validation and uses OS safeStorage', () => {
  const mainContent = fs.readFileSync(mainPath, 'utf-8');

  assert.ok(
    mainContent.includes('validateIpcSender'),
    'Must implement IPC sender validation'
  );
  assert.ok(
    mainContent.includes('senderFrame !== mainWindow.webContents.mainFrame'),
    'Must verify senderFrame against mainFrame to prevent iframe spoofing'
  );
  assert.ok(
    mainContent.includes('safeStorage'),
    'Must use Electron safeStorage for OS-level credential protection'
  );
});

// -------------------------------------------------------------
// Test 5: Strict Content Security Policy in index.html
// -------------------------------------------------------------
test('index.html contains strict Content Security Policy meta tag', () => {
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  assert.ok(
    htmlContent.includes('http-equiv="Content-Security-Policy"'),
    'index.html must declare a Content-Security-Policy meta header'
  );
  assert.ok(
    htmlContent.includes("default-src 'self'"),
    'CSP must restrict default-src to self'
  );
  assert.ok(
    htmlContent.includes("object-src 'none'"),
    'CSP must disable object-src to prevent plugin injection'
  );
  assert.ok(
    htmlContent.includes("base-uri 'self'"),
    'CSP must restrict base-uri to self'
  );
});

// -------------------------------------------------------------
// Test 6: Minimal, Typed Preload Bridge
// -------------------------------------------------------------
test('electron/preload.js exposes only minimal, safe APIs via contextBridge', () => {
  const preloadContent = fs.readFileSync(preloadPath, 'utf-8');

  assert.ok(
    preloadContent.includes("contextBridge.exposeInMainWorld('electronAPI'"),
    'Must expose electronAPI via contextBridge'
  );
  assert.ok(
    !preloadContent.includes('ipcRenderer.on'),
    'Preload should not expose arbitrary event emitter bindings'
  );
  assert.ok(
    !preloadContent.includes('require(') || !preloadContent.includes("require('child_process')"),
    'Preload must not expose node child_process or shell execution'
  );
});

console.log(`\n🎉 Results: ${passedTests} / ${totalTests} tests passed.\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
