<template>
  <Teleport to="body">
    <!-- 内容区 -->
    <transition name="popup-down-up">
      <div
        v-bind="$attrs"
        class="w-screen bg-white fixed z-50 bottom-0 dark:bg-zinc-800"
        v-if="isOpen"
      >
        <slot></slot>
      </div>
    </transition>

    <!-- 遮罩层 -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="w-screen h-screen bg-zinc-900/80 fixed z-40 left-0 top-0"
        @click="isOpen = false"
      ></div>
    </transition>
  </Teleport>
</template>

<script setup>
import { useVModel, useScrollLock } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const isOpen = useVModel(props, 'modelValue', emit)
const isLocked = useScrollLock(document.body)

watch(isOpen, (val) => {
  isLocked.value = val
})
</script>

<style lang="scss" scoped>
// fade 展示动画
.fade-enter-active {
  transition: all 0.3s;
}

.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// popup-down-up 展示动画
.popup-down-up-enter-active {
  transition: all 0.3s;
}

.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
