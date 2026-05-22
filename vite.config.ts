// ### app/vite.config.ts ###
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      serverPort: 4101,
      spaEntryPoints: 'src/main.ts',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    origin: 'http://localhost:4101',
  },
  build: {
    rollupOptions: {
      external: ['single-spa', 'single-spa-vue', '@vu/shared'],
    },
  },
});
