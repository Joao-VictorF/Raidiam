import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(head)
app.use(pinia)
app.use(router)

app.mount('#app')
