// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己的样式
import './assets/css/index.css'
import ElementTreeGrid from 'element-tree-grid'
// 将axios添加到Vue原型中，那么任意的实例就可以直接通过this来直接获取到axios
// 对于不是Vue插件，但是还想在任意组件中使用的模块，都可以添加到Vue原型中
// 导入axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.component(ElementTreeGrid.name, ElementTreeGrid)
// 配置基准路径：
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// 请求拦截器
// 只要是axios发出的请求，都会执行请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  // 返回config
  return config
})
// 安装插件
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
