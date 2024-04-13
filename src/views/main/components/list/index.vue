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
          <item-vue
            :data="item"
            :width="width"
            @clickCardItem="onToPins"
          ></item-vue>
        </template>
      </m-waterfall>
    </m-infinite-list>

    <!-- 大图详情处理 -->
    <transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <PinsVue
        v-if="isVisiblePins"
        :id="currentPins.id"
        :key="currentPins.id"
      />
    </transition>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import ItemVue from './item.vue'
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import PinsVue from '@/views/pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

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

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  Object.assign(query, newQuery)
  // 重置状态 触发watterfall 组件获取数据
  isFinished.value = false
  pexelsList.value = []
}
/**
 * 监听分类变化，触发列表切换
 */
const store = useStore()
watch(
  () => store.getters.currentCategory,
  (val) => {
    resetQuery({
      page: 1,
      categoryId: val.id
    })
  }
)
/**
 * 监听搜索内容项的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})
/**
 * 进入 pins
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}

useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

const onBeforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY
  })
}
const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.location?.translateX,
    y: currentPins.value.location?.translateY,
    opacity: 0
  })
}
</script>
<style lang="scss" scoped></style>
