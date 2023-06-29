import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { resetStore } from '@/utils';
import directives from '@/directives'
import { $router } from '@/router'
import App from './App'

import '@unocss/reset/tailwind.css'
import "./styles/index.scss"

// NOTE: 开启mode: vue-scoped需要注释import 'uno.css'
// import 'uno.css'

import ElementPlus from 'element-plus'

const app = createApp(App)
const pinia = createPinia()
pinia.use(resetStore);

app
.use($router)
.use(pinia)
.use(directives)
.use(ElementPlus)
.mount('#app')
