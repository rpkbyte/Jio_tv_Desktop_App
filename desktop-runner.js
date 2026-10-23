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
    const chunks = [];
    proxyRes.on('data', (chunk) => chunks.push(chunk));
    proxyRes.on('end', () => {
      const bodyStr = Buffer.concat(chunks).toString('utf-8');
      console.log(`[Jio Proxy Response] https://${targetHost}${targetPath} -> Status ${proxyRes.statusCode}`);
      if (bodyStr.length > 0) {
        console.log(`[Jio Proxy Body] ${bodyStr.slice(0, 400)}`);
      }

      const responseHeaders = { ...proxyRes.headers };
      responseHeaders['access-control-allow-origin'] = '*';
      responseHeaders['access-control-allow-methods'] = 'GET, POST, OPTIONS';
      responseHeaders['access-control-allow-headers'] = '*';

      res.writeHead(proxyRes.statusCode, responseHeaders);
      res.end(bodyStr);
    });
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

function proxyJioStream(req, res, targetUrlStr) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  let cleanUrl = targetUrlStr;
  if (cleanUrl.startsWith('https:/') && !cleanUrl.startsWith('https://')) {
    cleanUrl = cleanUrl.replace('https:/', 'https://');
  } else if (cleanUrl.startsWith('http:/') && !cleanUrl.startsWith('http://')) {
    cleanUrl = cleanUrl.replace('http:/', 'http://');
  } else if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(cleanUrl);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid stream URL', details: e.message }));
    return;
  }

  const cleanHeaders = { ...req.headers };
  delete cleanHeaders['host'];
  delete cleanHeaders['origin'];
  delete cleanHeaders['referer'];

  const client = parsedUrl.protocol === 'https:' ? https : http;
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: parsedUrl.pathname + parsedUrl.search,
    method: req.method || 'GET',
    headers: {
      ...cleanHeaders,
      'host': parsedUrl.hostname,
      'user-agent': 'plaYtv/7.1.7 (Linux;Android 11) ExoPlayerLib/2.11.7'
    }
  };

  const proxyReq = client.request(options, (proxyRes) => {
    // Follow HTTP redirects automatically (301, 302, 307, 308)
    if ([301, 302, 307, 308].includes(proxyRes.statusCode) && proxyRes.headers.location) {
      const redirectLoc = proxyRes.headers.location;
      const fullRedirect = new URL(redirectLoc, cleanUrl).toString();
      proxyJioStream(req, res, fullRedirect);
      return;
    }

    const contentType = proxyRes.headers['content-type'] || '';
    const isM3U8 = contentType.includes('mpegurl') || parsedUrl.pathname.endsWith('.m3u8');

    if (isM3U8) {
      const chunks = [];
      proxyRes.on('data', (c) => chunks.push(c));
      proxyRes.on('end', () => {
        let manifest = Buffer.concat(chunks).toString('utf-8');
        const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
        // Rewrite root-relative URLs in playlist
        manifest = manifest.split('\n').map((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
            return `/api/jio-stream/${baseUrl}${trimmed}`;
          }
          return line;
        }).join('\n');

        const headers = { ...proxyRes.headers };
        headers['access-control-allow-origin'] = '*';
        headers['access-control-allow-methods'] = 'GET, HEAD, OPTIONS';
        headers['access-control-allow-headers'] = '*';
        headers['content-length'] = Buffer.byteLength(manifest);

        res.writeHead(proxyRes.statusCode, headers);
        res.end(manifest);
      });
    } else {
      const headers = { ...proxyRes.headers };
      headers['access-control-allow-origin'] = '*';
      headers['access-control-allow-methods'] = 'GET, HEAD, OPTIONS';
      headers['access-control-allow-headers'] = '*';

      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res);
    }
  });

  proxyReq.on('error', (err) => {
    console.error(`[Jio Stream Proxy Error] ${cleanUrl} -> ${err.message}`);
    res.writeHead(502, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ error: 'Stream Proxy Gateway Error', details: err.message }));
  });

  req.pipe(proxyReq);
}

function createServer() {
  return http.createServer((req, res) => {
    const rawUrl = req.url || '/';

    // Handle Jio Stream Proxy
    if (rawUrl.startsWith('/api/jio-stream')) {
      let targetUrl = '';
      if (rawUrl.startsWith('/api/jio-stream?url=')) {
        targetUrl = decodeURIComponent(rawUrl.split('/api/jio-stream?url=')[1] || '');
      } else {
        targetUrl = rawUrl.replace(/^\/api\/jio-stream\//, '');
      }
      proxyJioStream(req, res, targetUrl);
      return;
    }

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
    if (rawUrl.startsWith('/api/jio-token')) {
      const targetPath = rawUrl.replace('/api/jio-token', '');
      proxyJioRequest(req, res, 'auth.media.jio.com', targetPath);
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
