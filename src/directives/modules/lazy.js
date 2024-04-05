/**
 * 图片懒加载
 */
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'lazy',
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = binding.value
        stop()
      }
    })
  }
}
