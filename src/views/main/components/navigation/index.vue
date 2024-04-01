<template>
  <mobile-navigation v-if="isMobileTerminal"></mobile-navigation>
  <pc-navigation v-else></pc-navigation>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import PcNavigation from './pc/index.vue'
import { useStore } from 'vuex'

const store = useStore()
// 触发 category 数据获取动作
store.dispatch('category/getCategorys')
</script>

<style lang="scss" scoped></style>
