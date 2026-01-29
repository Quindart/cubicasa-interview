import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import sitemap from 'vite-plugin-sitemap';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    sitemap(),
    imagemin({
      pngquant: {
        quality: [0.6, 0.8]
      },
      webp: {
        quality: 75
      }
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 5173
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true
  }
});