// Desktop Application Native Launcher for JioTV
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 4173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
}

function findBrowserBinary() {
  const candidates = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
  ];

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

const server = createServer();
server.listen(PORT, '127.0.0.1', () => {
  const appUrl = `http://127.0.0.1:${PORT}`;
  console.log(`====================================================`);
  console.log(` JioTV Desktop Application Server running at ${appUrl}`);
  console.log(`====================================================`);

  const browserPath = findBrowserBinary();
  const profileDir = path.join(__dirname, '.jiotv_profile');

  if (browserPath) {
    console.log(`Launching JioTV Native Desktop Window via: ${browserPath}`);
    const appArgs = [
      `--app=${appUrl}`,
      `--user-data-dir=${profileDir}`,
      '--window-size=1366,850',
      '--disable-extensions',
      '--disable-translate',
      '--autoplay-policy=no-user-gesture-required'
    ];

    const child = spawn(browserPath, appArgs, {
      detached: false,
      stdio: 'ignore'
    });

    child.on('exit', () => {
      console.log('JioTV Desktop window closed. Shutting down server...');
      server.close(() => process.exit(0));
    });

    process.on('SIGINT', () => {
      try { child.kill(); } catch (e) {}
      process.exit(0);
    });
  } else {
    console.log(`Please open your browser to: ${appUrl}`);
  }
});
