import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
 plugins: [react(), tailwindcss()],
 optimizeDeps: { entries: ['index.html'] },
 build: { manifest: true, rollupOptions: { output: { manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'motion': ['motion/react']
 } } } },
 server: { host: '127.0.0.1', fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/Documenti/**', '**/research/**', '**/original-home.html'] } }
});
