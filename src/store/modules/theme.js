import { THEME_LIGHT } from '@/constants'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    // 主题模式
    themeType: getItem('themeType') || THEME_LIGHT
  }),
  mutations: {
    /**
     *  切换主题模式
     */
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
      setItem('themeType', newTheme)
    }
  }
}
