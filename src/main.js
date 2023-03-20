import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'


createApp(App)
.use(store)

.use(store)
.use(router)
.use(Notifications)
.use(VueAxios, axios)
.mount('#app')
