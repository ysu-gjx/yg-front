<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue" ref="searchRef" @search="onSearchHandler">
      <template #dropdown>
        <!-- 搜索提示 -->
        <HintVue
          :searchText="inputValue.trim()"
          v-show="inputValue"
          @itemClick="onSearchHandler"
        ></HintVue>
        <!-- 历史记录 -->
        <HistoryVue
          v-show="!inputValue"
          @itemClick="onSearchHandler"
        ></HistoryVue>
        <!-- 推荐主题 -->
        <ThemeVue v-show="!inputValue"></ThemeVue>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
import { useStore } from 'vuex'
import HistoryVue from './history.vue'
import ThemeVue from './theme.vue'

const inputValue = ref('')

// 搜索回调
const store = useStore()
const searchRef = ref(null)
const onSearchHandler = (item) => {
  // searchRef.value.close()

  inputValue.value = item
  store.commit('search/addHistory', item)
  // 触发 searchText 变化
  store.commit('app/changeSearchText', item)
}
</script>
<style lang="scss" scoped></style>
