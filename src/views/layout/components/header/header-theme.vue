<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>
<script setup>
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

/**
 * 1. 监听主题的切换行为
 * 2. 根据行为保存当前需要展示的主题到 vuex 中
 * 3. 根据 vuex 中保存的当前主题，展示 header-theme 显示图标
 * 4. 根据vuex 中保存的主题，修改html class
 */
/**
 * menu 切换事件
 * @param {*} theme
 */
const store = useStore()
const onItemClick = (theme) => {
  store.commit('theme/changeThemeType', theme.type)
}

// 控制图标展示
const svgIconName = computed(() => {
  // 根据当前的 themeType 返回当前的选中 icon
  const findTheme = themeArr.find((theme) => {
    return theme.type === store.getters.themeType
  })
  return findTheme?.icon
})
</script>
<style lang="scss" scoped></style>
