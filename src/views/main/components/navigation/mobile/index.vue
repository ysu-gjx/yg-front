<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      ref="ulTargetRef"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden duration-200"
    >
      <!-- slider 滑块 -->
      <li
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        ref="sliderRef"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed z-20 top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
        @click="isVisible = true"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
        ref="itemRefs"
        @click="currentCategoryIndex = index"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup v-model="isVisible">
    <menu-vue :categories="data" @onItemClick="onItemClick"></menu-vue>
  </m-popup>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'

// vite 构建的项目中，我们可以直接使用 defineProps
defineProps({
  data: {
    type: Array,
    required: true
  }
})

const sliderStyle = ref({
  transform: 'translateX(0)',
  width: '52px'
})

const currentCategoryIndex = ref(0)
const itemRefs = ref([])
const ulTargetRef = ref(null)
const isVisible = ref(false)

const { x: ulScrollLeft } = useScroll(ulTargetRef)

watch(currentCategoryIndex, (val) => {
  const { width, left, x } = itemRefs.value[val].getBoundingClientRect()
  const paddingL = parseFloat(
    getComputedStyle(ulTargetRef.value).getPropertyValue('padding-left')
  )
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - paddingL}px)`,
    width: width + 'px'
  }
})

const onItemClick = (index) => {
  currentCategoryIndex.value = index
  isVisible.value = false

  nextTick(() => {
    // 设置被选中项 在 navigation 中的滚动到可视区域中
    itemRefs.value[index].scrollIntoViewIfNeeded()
  })
}
</script>

<style lang="scss" scoped></style>
