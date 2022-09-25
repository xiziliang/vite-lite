/// <reference types="node" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import * as path from 'path'
import PluginTs from 'vite-plugin-ts'
import Unocss from 'unocss/vite'

const rootPath = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(rootPath, 'src')}`,
    },
  },
  plugins: [
    Vue(), 
    PluginTs(),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
  server: {
    host: '0.0.0.0',
    open: true,
    port: 3000,
  },
})
