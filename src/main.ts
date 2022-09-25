import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { $router } from '@/router'
import "./styles/index.scss"
import 'uno.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use($router).use(ElementPlus).mount('#app')
