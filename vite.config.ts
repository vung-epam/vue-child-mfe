/// <reference types="vite/client" />
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

const sanitizeName = (name: string) =>
  name
    .replace(/^_+/, '')
    .replace(/_+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.-]/g, '');

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
    css: {
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      rollupOptions: {
        external: ['single-spa'],
        output: {
          entryFileNames: (chunkInfo) =>
            `assets/${sanitizeName(chunkInfo.name)}-[hash].js`,
          chunkFileNames: (chunkInfo) =>
            `assets/${sanitizeName(chunkInfo.name)}-[hash].js`,
          assetFileNames: (assetInfo) => {
            const rawName = assetInfo.name ?? 'asset';
            const lastDot = rawName.lastIndexOf('.');
            const baseName = lastDot > 0 ? rawName.slice(0, lastDot) : rawName;
            const extension = lastDot > 0 ? rawName.slice(lastDot) : '';
            return `assets/${sanitizeName(baseName)}-[hash]${extension}`;
          },
        },
      },
    },
  };
});
