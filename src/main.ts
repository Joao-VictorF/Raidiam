import './assets/main.css'

import { createApp } from 'vue'
// @ts-expect-error unhead does not have types
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(createPinia())
app.use(router)

app.mount('#app')
