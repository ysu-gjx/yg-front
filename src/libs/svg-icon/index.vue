<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 显示的 svg
  name: {
    type: String,
    required: true
  },
  // svg 图标的颜色
  color: {
    type: String
  },
  // tailwind 指定的图标的颜色 类名
  fillClass: {
    type: String
  }
})

// 真实显示 svg 图标（拼接 #icon-）
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
