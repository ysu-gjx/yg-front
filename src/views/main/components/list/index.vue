<template>
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import ItemVue from './item.vue'
import { getPexelsList } from '@/api/pexels'

/**
 * 构建数据请求
 */
let query = reactive({
  page: 1,
  size: 20
})
const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}

getPexelsData()
</script>
<style lang="scss" scoped></style>
