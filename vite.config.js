import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
