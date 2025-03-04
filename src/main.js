import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import router from './router/index.js'
import { createPinia} from 'pinia'
import {
    Button,
    Card, Column, ConfirmationService, ConfirmDialog, DataTable,
    DatePicker,
    Dialog, DialogService,
    FloatLabel,
    InputNumber,
    InputText,
    Password,
    ScrollPanel,
    Select, Toolbar
} from "primevue";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.component('pv-button', Button)
    .component('pv-float-label', FloatLabel)
    .component('pv-input-text', InputText)
    .component('pv-password', Password)
    .component('pv-card', Card)
    .component('pv-dialog', Dialog)
    .component('pv-scroll-panel', ScrollPanel)
    .component('pv-date-picker', DatePicker)
    .component('pv-select', Select)
    .component('pv-input-number', InputNumber)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-toolbar', Toolbar)
    .component('pv-confirm-dialog', ConfirmDialog)

app.use(router)
app.use(ConfirmationService)
app.use(DialogService)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
