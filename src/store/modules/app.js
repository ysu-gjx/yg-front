import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { setItem, getItem } from '@/utils/storage'

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    // 搜索的文本
    searchText: ''
  }),

  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, payload) {
      state.currentCategory = payload
    },
    /**
     * 修改 searchText
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  },
  actions: {}
}
