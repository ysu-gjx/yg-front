<template>
  <transition name="down" @after-leave="destroy">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<script>
/**
 * 消息类型可选项
 */
const typeEnum = ['success', 'warn', 'error']
</script>
<script setup>
import { ref, onMounted } from 'vue'
import MSvgIcon from '../svg-icon/index.vue'

const props = defineProps({
  /**
   * message 的消息类型
   */
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
      }
      return result
    }
  },
  /**
   * 描述文本
   */
  content: {
    type: String,
    required: true
  },
  /**
   * 展示时长
   */
  duration: {
    type: Number
  },
  /**
   * 关闭时的回调
   */
  destroy: {
    type: Function
  }
})

// 样式表数据
const styles = {
  // 警告  原来是warn  我这里保持和 element plus的保持一致
  warning: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}

//  控制 message 是否显示
const isVisible = ref(false)

// 关闭动画执行时间
const animateDuration = '0.5s'

/**
 * 保证动画展示，需要在 mounted 之后进行展示
 */
onMounted(() => {
  isVisible.value = true
  /**
   * 延迟时间关闭
   */
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
      props.destroy && props.destroy()
    }, parseInt(animateDuration.replace('0.', '').replace('s', '')) * 100)
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animateDuration);
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
