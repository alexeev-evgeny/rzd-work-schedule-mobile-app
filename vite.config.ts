import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
  plugins: [
    Vue()
  ]
});
