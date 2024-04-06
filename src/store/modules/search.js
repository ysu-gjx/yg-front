import { getItem, setItem } from '@/utils/storage'

// 同步到storage
const syncStorage = (state) => {
  setItem('history', state.history)
}

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // 搜索历史
    history: getItem('history') || []
  }),

  mutations: {
    /**
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(state, newHistory) {
      const index = state.history.findIndex((item) => item === newHistory)
      if (index !== -1) {
        // 剔除旧数据
        state.history.splice(index, 1)
      }
      state.history.unshift(newHistory)
      syncStorage(state)
    },
    // 删除指定数据
    deleteHistory(state, index) {
      state.history.splice(index, 1)
      syncStorage(state)
    },
    // 删除全部
    deleteAllHistory(state) {
      state.history = []
      syncStorage(state)
    }
  },
  actions: {}
}
