import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from "vuetify";
import "vuetify/styles"; 
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify();

app.use(createPinia())
app.use(router)

app.use(vuetify);
app.mount('#app')
