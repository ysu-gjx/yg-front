<template>
  <div>
    <!--  -->
    <slot />
    <!--  -->
    <div class="h-6 py-4" ref="targetRef">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!--没有更多数据了  -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了!
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean
  }
})
// 是否处于加载状态
const loading = defineModel({ type: Boolean })
const emit = defineEmits(['onLoad'])

const targetRef = ref(null)
const targetIsIntersecting = ref(false)

/**
 * !滚动由监听进入视图触发load,不需要加延迟，但是加载完未铺满屏幕需要通过监听loading 变化触发load,需要加延迟，否则
 * !加载完数据，但是未渲染到页面，会导致多次触发loading 变化
 */
// 监听是否进入可视区
const { stop } = useIntersectionObserver(
  targetRef,
  ([{ isIntersecting }], observerElement) => {
    targetIsIntersecting.value = isIntersecting
    // 触发load
    emitLoad()
  }
)
// 加载函数
const emitLoad = () => {
  // 在可视区 同时 不在加载中 ，同时未完成状态
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    // 修改加载数据标记
    loading.value = true
    // 触发加载更多行为
    emit('onLoad')
  }
}

// 监听loading 变化
watch(loading, (val) => {
  // 触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
  //  由 false -> true ，由监听事件触发，这里只需要处理加载未铺满屏幕的情况
  if (val) return
  setTimeout(emitLoad, 1000)
})
</script>
<style lang="scss" scoped></style>
