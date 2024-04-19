/**
 * 图片懒加载
 */
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'lazy',
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // binding.value && (el.src = binding.value)
        el.src = binding.value
        stop()
      }
    })
  }
  // updated(el, binding) {
  //   if (el.src) return
  //   const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
  //     if (isIntersecting) {
  //       el.src = binding.value
  //       stop()
  //     }
  //   })
  // }
}
