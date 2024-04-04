<template>
  <div>
    <m-waterfall
      class="w-full px-1"
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import ItemVue from './item.vue'
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'

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
