import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'node:https';
import http from 'node:http';

function jioStreamProxyPlugin() {
  return {
    name: 'jio-stream-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        if (!rawUrl.startsWith('/api/jio-stream')) {
          return next();
        }

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

        let targetUrl = '';
        if (rawUrl.startsWith('/api/jio-stream?url=')) {
          targetUrl = decodeURIComponent(rawUrl.split('/api/jio-stream?url=')[1] || '');
        } else {
          targetUrl = rawUrl.replace(/^\/api\/jio-stream\//, '');
        }

        if (targetUrl.startsWith('https:/') && !targetUrl.startsWith('https://')) {
          targetUrl = targetUrl.replace('https:/', 'https://');
        } else if (targetUrl.startsWith('http:/') && !targetUrl.startsWith('http://')) {
          targetUrl = targetUrl.replace('http:/', 'http://');
        } else if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
          targetUrl = 'https://' + targetUrl;
        }

        let parsedUrl;
        try {
          parsedUrl = new URL(targetUrl);
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid URL', details: e.message }));
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
          if ([301, 302, 307, 308].includes(proxyRes.statusCode) && proxyRes.headers.location) {
            const redirectLoc = proxyRes.headers.location;
            const fullRedirect = new URL(redirectLoc, targetUrl).toString();
            res.writeHead(302, {
              'Location': `/api/jio-stream/${fullRedirect}`,
              'Access-Control-Allow-Origin': '*'
            });
            res.end();
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
          res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ error: err.message }));
        });

        req.pipe(proxyReq);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), jioStreamProxyPlugin()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api/jio-user': {
        target: 'https://jiotvapi.media.jio.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/jio-user/, '')
      },
      '/api/jio-data': {
        target: 'https://jiotv.data.cdn.jio.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/jio-data/, '')
      },
      '/api/jio-epg': {
        target: 'https://jiotvapi.cdn.jio.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/jio-epg/, '')
      },
      '/api/jio-token': {
        target: 'https://auth.media.jio.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/jio-token/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
