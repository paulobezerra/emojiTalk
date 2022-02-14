import {createApp} from 'vue'
import App from "./App.vue"
import router from './router'
import './registerServiceWorker'

// Vue.config.productionTip = false

const app = createApp(App)

app.use(router)

app.mount('#app')
