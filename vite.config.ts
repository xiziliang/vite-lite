/// <reference types="node" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import * as path from 'path'
import PluginTs from 'vite-plugin-ts'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

const rootPath = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(rootPath, 'src')}`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }), 
    PluginTs(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue/macros',
      ],
      dts: 'src/typings/vue-macros.d.ts',
      vueTemplate: true,
    })
  ],
  server: {
    host: '0.0.0.0',
    open: true,
    port: 3000,
  },
})
