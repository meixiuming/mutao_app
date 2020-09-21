// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'normalize.css/normalize.css'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/icons' // icon
import '@/styles/index.scss' // global css
import 'vant/lib/index.css'
import Vant from 'vant'
import store from'./store'
Vue.use(Vant)
// 全局使用
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
//
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });
router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
