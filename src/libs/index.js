import { defineAsyncComponent } from 'vue'
// import SvgIcon from './svg-icon/index.vue'
// import Popup from './popup/index.vue'

export default {
  install(app) {
    // app.component('m-svg-icon', SvgIcon)
    // app.component('m-popup', Popup)

    // 1. 获取当前路径下所有文件夹中的 index.vue
    const components = import.meta.glob('./*/index.vue')
    // console.log(components)

    // 2. 遍历获取到的组件模块
    for (const [filePath, compFn] of Object.entries(components)) {
      // 3. 利用 app.component 进行注册
      const compName = filePath.split('/')[1]
      app.component(`m-${compName}`, defineAsyncComponent(compFn))
    }
  }
}
