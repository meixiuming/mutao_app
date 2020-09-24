import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index';
import Layout  from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {path:'/', redirect:'home'},
  {path: '/login', component: () => import('@/views/login/index'), meta: { hidden: true,title:"登陆页"}},
  {path: '/register', component: () => import('@/views/register/index'), hidden: true},
  {
    path: '/404',
    component: (resolve) => require(['@/views/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/401'], resolve),
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]
export const asyncRouterMap = [
  {
    path:'/pms',
    component:Layout,
    redirect:'/pms/product',
    name:'pms',
    meta:{title:'商品',icon:'product'},
    children:[
      {
        path:'product',
        name:'product',
        component: ()=>import('@/views/pms/product/index'),
        meta: {title:'商品列表',icon:'product-list'}
      }
    ]

  }

  ]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
