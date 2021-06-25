// import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import learn from '../components/learn'
import index from '../components/index'
import About from '../views/About'
import cookie from '../utils/cookie'
import nofound from '../components/nofound'
import warning from '../components/warning'
import layout from '../layout/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/home',
    children: [
      {
        name: Home,
        path: '/home',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        beforeEnter(to, form, next) {
          console.log('beforeEnter', to, form, next)
          next()
        }
      },
      {
        path: 'warn',
        name: 'warning',
        component: warning
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login')
  },
  {
    path: '/learn',
    name: 'Learn',
    // component: learn
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/learn.vue'),
    // beforeEnter: ((to, form, next) => {
    //   alert('去登录吧');
    //   next('/login')
    // })
  },
  {
    path: '/motheds',
    name: 'Motheds',
    // component: learn
    component: () =>
      import(/* webpackChunkName: "methods" */ '../components/motheds.vue'),
    redirect: '/learn'
  },
  {
    path: '/store',
    name: 'store',
    component: () => import(/* webpackChunkName: "store" */ '../components/store'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/computed',
    name: 'computed',
    component: () => import(/* webpackChunkName: "computed" */'../components/computed')
  },
  {
    path: '/404',
    name: 'nofound',
    component: nofound,
  },
  {
    path: '*',
    name: '',
    redirect: '/404'
  }

]

const router = new VueRouter({
  routes,
  mode: 'hash',
})

/*
* beforeEach:从一个页面跳转到另外一个页面时触发
* to:要跳转的页面
* from:从哪个页面出来
* next:决定是否通过
*/

router.beforeEach((to, form, next) => {
  console.log('beforeEach', to)
  // 如果跳转的页面不出现，则跳转到 404 页面
  // if (to.matched.length === 0) {
  //   next('/404')
  // }
  if (cookie.getCookie('user')) {

    if (to.path === '/login') next()
    else {
      let token = localStorage.getItem('username')
      if (token) next()
      else {
        alert('尚未登录，请先登录')
        next('/login')
      }
    }
  } else next()
})

router.beforeResolve((to, form, next) => {
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

export default router
