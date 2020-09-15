import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index';
import Layout  from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {path:'/', redirect:'login'},
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]
export const asyncRouterMap = [
  ]

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
