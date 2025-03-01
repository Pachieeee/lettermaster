import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.css'
import router from './router/index.js'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(router)

app.mount('#app')
