import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import store from './store'

// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()

const app = createApp(App)

app.use(router).use(store).use(mLibs).mount('#app')
