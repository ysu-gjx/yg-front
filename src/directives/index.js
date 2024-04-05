// import lazy from './modules/lazy'

/**
 * 全局指令注册
 */
export default {
  install(app) {
    // https://cn.vitejs.dev/guide/features.html#glob-import
    // import.meta.globEager 为同步导入

    // 1. 获取当前路径下所有文件夹中的 指令
    const directives = import.meta.glob('./modules/*.js', {
      eager: true,
      import: 'default'
    })
    // 2. 遍历获取到的指令模块
    for (const [key, value] of Object.entries(directives)) {
      // 3.
      const name = key.replace(/.*\/(.*)\.js$/, '$1')

      // 利用 app.directive 进行注册
      app.directive(`${name}`, value)
    }
    // app.directive('lazy', lazy)
  }
}
