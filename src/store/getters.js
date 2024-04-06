export default {
  categorys: (state) => state.category.categorys,
  /**
   * 当前主题
   */
  themeType: (state) => state.theme.themeType,
  // 当前 category
  currentCategory: (state) => state.app.currentCategory,
  // currentCategoryIndex
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(
      (item) => item.id === getters.currentCategory.id
    )
  },
  // 搜索历史记录
  history: (state) => state.search.history
}
