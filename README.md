# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## init project

1. pnpm create vite
  - set name: yg-front
  - select language vue
  - install deps
2. install tailwindcss
```sh
pnpm install -D tailwindcss@3.0.23 postcss@8.4.8 autoprefixer@10.4.2
```
执行 `pnpm tailwindcss init -p` 创建 `tailwind.config.js` 文件，该文件为 tailwindcss 的配置文件，

在 `tailwind.config.js` 文件中的 content 选项下，写入如下内容：
```js
module.exports = {
  // Tailwind 应用范围
  content: ['./index.html', './src/**/*.{vue,js}'],
	...
}
```

接下来我们需要添加一些 tailwind 的指令,创建 `src/styles/index.scss `文件，并写入如下代码：
```scss
// 导入 tailwind 的基础指令组件
@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后在 `src/main.js` 中引入该 `index.scss`

因为我们使用了 `scss` ，所以需要安装 sass ，执行 `pnpm i -D sass@1.45.0` 安装 sass

3. vscode plugin
  1. `Prettier - Code formatter`
  - 在 VSCode 的扩展中，安装插件 Prettier - Code formatter
  - 然后需要在 项目根目录 之中创建 .prettierrc，并且写入如下内容：
  ```
  {
  // 代码结尾不加分号
  "semi": false,
  // 优先单引号
  "singleQuote": true,
  // 不添加尾随逗号
  "trailingComma": "none"
  }
  ```
  - 在你的 `.vue` 文件、`.js` 文件中，鼠标右键，选择 **使用…格式化文档**
  - 选择 **配置默认格式化程序**
  - 选择 `prettier`
  - 此时执行 **格式化文档** ，则可进行代码格式化
  - 如果你希望在 **保存代码** 时，自动格式化代码内容，则可以在 **设置** 中勾选 **format on save**
  2. `Tailwind CSS IntelliSense`
    - 安装成功之后，此时我们只需要在：元素的 `class` 中，先按下《空格》，然后输入任意的 `tailwind` 类名，则可得到对应提示
  3. `Vue Language Features (Volar)` 
    - 是一个专门的 vue3 辅助插件。这个插件我们不需要做什么特殊的处理，只需要安装即可

4. 项目目录
```sh
pnpm i --save vuex@4.0.2 vue-router@4.0.14
```
```
├── src
│   ├── App.vue // 项目根组件，一级路由出口
│   ├── api // 接口请求
│   ├── assets // 静态资源
│   │   ├── icons // svg icon 图标
│   │   ├── images // image 图标。比如:xxx.png
│   │   └── logo.png // logo
│   ├── components // 通用的业务组件。比如：一个组件在多个页面中使用到
│   ├── constants // 常量
│   ├── directives // 自定义指令
│   ├── libs // 通用组件，可用于构建中台物料库或通用组件库
│   ├── main.js // 入口文件
│   ├── permission.js // 页面权限控制中心
│   ├── router // 路由
│   │   ├── index.js // 路由处理中心
│   │   └── modules // 路由模块
│   │       ├── mobile-routes.js // 移动端路由
│   │       └── pc-routes.js // PC 端路由
│   ├── store // 全局状态
│   │   ├── getters.js // 全局状态访问处理
│   │   ├── index.js // 全局状态中心
│   │   └── modules // 状态子模块
│   ├── styles // 全局样式
│   │   └── index.scss // 全局通用的样式处理
│   ├── utils // 工具模块
│   ├── vendor // 外部供应资源。比如：人类行为认证
│   └── views // 页面组件。与 components 的区别在于：此处组件对应路由表，以页面的形式展示
│       └── layout // 用于 PC 端，分割一级路由和二级路由
│           ├── components // 该页面组件下的业务组件
│           └── index.vue // layout 组件
├── tailwind.config.js // wailwind css 配置文件，与 src 平级
└── vite.config.js // vite 配置文件，与 src 平级

```

