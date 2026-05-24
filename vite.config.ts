import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      serverPort: 4101,
      spaEntryPoints: 'src/main.ts',
    }),
  ],
});
