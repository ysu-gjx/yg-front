<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          ></m-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'
import steps from './steps'

let driverObj
const initDriver = () => {
  driverObj = driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    doneBtnText: '完成',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    showButtons: ['next', 'previous', 'close'],
    onPopoverRender: (popover) => {
      popover.closeButton.style.display = ''
    }
  })
}
onMounted(() => {
  initDriver()
})

// 触发引导
const onGuideClick = () => {
  if (driverObj.isActive()) return
  driverObj.setSteps(steps)
  driverObj.drive()
}
</script>
<style lang="scss" scoped></style>
