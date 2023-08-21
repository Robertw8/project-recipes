import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: './src/index.html',
        favorites: './src/favorites.html',
      },
    },
    outDir: '../dist',
  },
  plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
