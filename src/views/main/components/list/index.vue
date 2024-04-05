<template>
  <div>
    <!-- 列表处理 -->
    <m-infinite-list
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
      <m-waterfall
        class="w-full px-1"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite-list>
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

// 是否加载中
const loading = ref(false)
// 是否加载完毕
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])

const getPexelsData = async () => {
  // 数据全部加载完成则 return
  if (isFinished.value) return
  // 完成第一次请求之后，后续请求让 page 自增
  if (pexelsList.value.length > 0) {
    query.page += 1
  }

  // 触发接口请求
  const res = await getPexelsList(query)
  // 初始请求清空数据源
  pexelsList.value = pexelsList.value.concat(res.list)

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 修改 loading 标记
  loading.value = false
}
</script>
<style lang="scss" scoped></style>
