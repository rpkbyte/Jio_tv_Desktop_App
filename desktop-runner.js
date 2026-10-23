// Desktop Application Native Launcher for JioTV
import http from 'node:http';
import https from 'node:https';
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

function proxyJioRequest(req, res, targetHost, targetPath) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  const cleanHeaders = { ...req.headers };
  delete cleanHeaders['host'];
  delete cleanHeaders['origin'];
  delete cleanHeaders['referer'];

  const options = {
    hostname: targetHost,
    port: 443,
    path: targetPath,
    method: req.method,
    headers: {
      ...cleanHeaders,
      'host': targetHost,
      'user-agent': 'plaYtv/7.1.7 (Linux;Android 11) ExoPlayerLib/2.11.7'
    }
  };

  console.log(`[Jio Proxy Request] ${req.method} https://${targetHost}${targetPath}`);

  const proxyReq = https.request(options, (proxyRes) => {
    console.log(`[Jio Proxy Response] https://${targetHost}${targetPath} -> Status ${proxyRes.statusCode}`);

    const responseHeaders = { ...proxyRes.headers };
    responseHeaders['access-control-allow-origin'] = '*';
    responseHeaders['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    responseHeaders['access-control-allow-headers'] = '*';

    res.writeHead(proxyRes.statusCode, responseHeaders);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`[Jio Proxy Error] https://${targetHost}${targetPath} -> ${err.message}`);
    res.writeHead(502, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    });
    res.end(JSON.stringify({ error: 'Jio Proxy Gateway Error', details: err.message }));
  });

  req.pipe(proxyReq);
}

function createServer() {
  return http.createServer((req, res) => {
    const rawUrl = req.url || '/';

    // Handle Jio API Proxies
    if (rawUrl.startsWith('/api/jio-user')) {
      const targetPath = rawUrl.replace('/api/jio-user', '');
      proxyJioRequest(req, res, 'jiotvapi.media.jio.com', targetPath);
      return;
    }
    if (rawUrl.startsWith('/api/jio-data')) {
      const targetPath = rawUrl.replace('/api/jio-data', '');
      proxyJioRequest(req, res, 'jiotv.data.cdn.jio.com', targetPath);
      return;
    }
    if (rawUrl.startsWith('/api/jio-epg')) {
      const targetPath = rawUrl.replace('/api/jio-epg', '');
      proxyJioRequest(req, res, 'jiotvapi.cdn.jio.com', targetPath);
      return;
    }

    let reqPath = decodeURI(rawUrl.split('?')[0]);
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
  console.log(` Proxy Endpoints: /api/jio-user, /api/jio-data, /api/jio-epg`);
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
      detached: true,
      stdio: 'ignore'
    });
    child.unref();

    console.log(`\nJioTV Desktop Window opened successfully!`);
    console.log(`Server is active at ${appUrl}`);
    console.log(`(Press Ctrl+C to stop the server)\n`);

    process.on('SIGINT', () => {
      console.log('\nShutting down JioTV server...');
      server.close(() => process.exit(0));
    });
  } else {
    console.log(`Please open your browser to: ${appUrl}`);
  }
});
