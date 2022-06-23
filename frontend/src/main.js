import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')


createApp(App).use(router).mount('#app')