<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-90"
      v-html="highlightText(item)"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'

const EMITS_ITEM_CLICK = 'itemClick'

const props = defineProps({
  searchText: {
    type: String
  }
})
const emit = defineEmits([EMITS_ITEM_CLICK])

const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)

  hintData.value = result
}
/**
 * 监听输入框变化，获取联想词
 */
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 300
})

/** 处理高亮替换 */
const highlightText = (text) => {
  // 生成要替换的高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, highlightStr)
}

/**
 * 处理点击事件
 */
const onItemClick = (item) => {
  emit(EMITS_ITEM_CLICK, item)
}
</script>
<style lang="scss" scoped></style>
