// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/icons' // icon
import '@/assets/styles/index.scss' // global css
import 'vant/lib/index.css'
import Vant from 'vant'
import store from'./store'
Vue.use(Vant)
// 全局使用
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
