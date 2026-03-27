import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

export default defineConfig({
  define: {
    '__APP_VERSION__': JSON.stringify(pkg.version),
  },
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
})