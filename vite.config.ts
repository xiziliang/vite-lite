/// <reference types="node" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import pluginTs from 'vite-plugin-ts';

const rootPath = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(rootPath, 'src')}`,
    },
  },
  plugins: [vue(), pluginTs()],
  server: {
    port: 3000,
  },
})
