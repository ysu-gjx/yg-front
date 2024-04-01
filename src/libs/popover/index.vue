<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div ref="referenceRef">
      <!-- 具名插槽 -->
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        ref="contentRef"
        :style="contentStyle"
        v-show="visible && $slots.default"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <!-- 弹出层内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
//  延迟关闭时长
const DELAY_TIME = 100
//  1. 指定所有的可选位置常量，并生成 enum：
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

// 定义指定位置的 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'
const visible = ref(false)
// 2.创建 prop，控制气泡位置：
const props = defineProps({
  placement: {
    type: String,
    default: PROP_TOP_LEFT,
    validator: (val) => {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})

// 控制延迟关闭
let timer = null
// 鼠标移入
const onMouseenter = () => {
  visible.value = true
  timer && clearTimeout(timer)
}
// 鼠标移出
const onMouseleave = () => {
  timer = setTimeout(() => {
    visible.value = false
  }, DELAY_TIME)
}

// 3.获取元素的 DOM，创建读取元素尺寸的方法：
const referenceRef = ref(null)
const contentRef = ref(null)
const getElementSize = (target) => {
  // const { width, height } = target.getBoundingClientRect()
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

// 4.生成气泡的样式对象，用来控制每个位置的对应样式：
/**
 * 计算弹层位置
 */
const contentStyle = ref({
  top: 0,
  left: 0
})

// 5.监听展示的变化，计算 contentStyle：
watch(visible, async (val) => {
  if (!val) return
  await nextTick()
  const { width, height } = getElementSize(referenceRef.value)
  const { width: contentWidth, height: contentHeight } = getElementSize(
    contentRef.value
  )
  switch (props.placement) {
    case PROP_TOP_LEFT:
      contentStyle.value = {
        top: 0,
        left: -contentWidth + 'px'
      }
      break
    case PROP_TOP_RIGHT:
      contentStyle.value = {
        top: 0,
        left: width + 'px'
      }
      break
    case PROP_BOTTOM_LEFT:
      contentStyle.value = {
        top: height + 'px',
        left: -contentWidth + 'px'
      }
      break
    case PROP_BOTTOM_RIGHT:
      contentStyle.value = {
        top: height + 'px',
        left: width + 'px'
      }
      break
    default:
      break
  }
})
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
