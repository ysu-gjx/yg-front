import MessageComponent from './index.vue'
import { h, render } from 'vue'

export const message = ({ type, content, duration = 3000 }) => {
  /**
   * 动画结束时的回调
   */
  const onDestroy = () => {
    // 3. message 销毁
    render(null, document.body)
  }
  // 1. 返回 vnode
  const vNode = h(MessageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  // 2. render
  render(vNode, document.body)
}

// 统一暴露
;['success', 'warning', 'error'].forEach((type) => {
  message[type] = (content, duration = 3000) => {
    return message({ type, content, duration })
  }
})
