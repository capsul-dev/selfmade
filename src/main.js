import { createApp } from 'vue'
import App from './views/main.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')

// debug
Object.assign(window, {
  _store: store
})
