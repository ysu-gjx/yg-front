<template>
  <mobile-navigation
    v-if="isMobileTerminal"
    :data="categorysData"
  ></mobile-navigation>
  <pc-navigation v-else></pc-navigation>
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import PcNavigation from './pc/index.vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categorysData = ref([])

const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categorysData.value = categorys

  categorysData.value.unshift(ALL_CATEGORY_ITEM)
  console.log(categorysData.value)
}
getCategoryData()
</script>

<style lang="scss" scoped></style>
