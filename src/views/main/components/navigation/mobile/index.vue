<template>
  <div class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-900 duration-500">
    <ul
      ref="ulTargetRef"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden duration-200"
    >
      <!-- slider 滑块 -->
      <li
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"
        ref="sliderRef"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed z-20 top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isVisible = true"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index
        }"
        ref="itemRefs"
        @click="onItemClick(item, index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup v-model="isVisible">
    <menu-vue @onItemClick="onItemClick"></menu-vue>
  </m-popup>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'
import { useStore } from 'vuex'

const sliderStyle = ref({
  transform: 'translateX(0)',
  width: '52px'
})

// const currentCategoryIndex = ref(0)
const itemRefs = ref([])
const ulTargetRef = ref(null)
const isVisible = ref(false)

const { x: ulScrollLeft } = useScroll(ulTargetRef)

const store = useStore()
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { width, left, x } = itemRefs.value[val].getBoundingClientRect()
    const paddingL = parseFloat(
      getComputedStyle(ulTargetRef.value).getPropertyValue('padding-left')
    )
    sliderStyle.value = {
      transform: `translateX(${ulScrollLeft.value + left - paddingL}px)`,
      width: width + 'px'
    }

    nextTick(() => {
      // 设置被选中项 在 navigation 中的滚动到可视区域中
      itemRefs.value[val].scrollIntoViewIfNeeded()
    })
  }
)

const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
  isVisible.value = false
}
</script>

<style lang="scss" scoped></style>
