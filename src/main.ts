import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { $router } from '@/router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import "./styles/index.scss"
import 'uno.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app
.use($router)
.use(pinia)
.use(ElementPlus)
.mount('#app')
