import { createStore } from 'vuex'
import category from './modules/category'
import getters from './getters'
import theme from './modules/theme'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  }
})

export default store
