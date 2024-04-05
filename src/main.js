import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import store from './store'
import mDirectives from './directives'
import useTheme from '@/utils/theme'

// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
useTheme()

const app = createApp(App)

app.use(router).use(store).use(mLibs).use(mDirectives).mount('#app')
