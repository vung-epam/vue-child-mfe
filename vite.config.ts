/// <reference types="vite/client" />
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      vitePluginSingleSpa({
        serverPort: 4101,
        spaEntryPoints: 'src/main.ts',
      }),
      cssInjectedByJsPlugin(),
    ],
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      rollupOptions: {
        external: ['single-spa'],
        sanitizeFileName: (name: string) => {
          return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_.-]/g, '');
        },
      },
    },
  };
});
