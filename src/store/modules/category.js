import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { setItem, getItem } from '@/utils/storage'

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // navigationBar 展示的数据源
    categorys: getItem('CATEGORYS') || CATEGORY_NOMAR_DATA
  }),
  mutations: {
    /**
     * 为 categorys 赋值
     */
    setCategorys(state, paload) {
      state.categorys = [ALL_CATEGORY_ITEM, ...paload]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async getCategorys({ commit }) {
      const { categorys } = await getCategory()
      commit('setCategorys', categorys)
      setItem('CATEGORYS', [ALL_CATEGORY_ITEM, ...categorys])
    }
  }
}
