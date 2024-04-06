import { createStore } from 'vuex'
import category from './modules/category'
import getters from './getters'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search
  }
})

export default store
