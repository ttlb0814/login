import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import learn from '../components/learn'
import index from '../components/index'
import About from '../views/About'
import cookie from '../utils/cookie'
import nofound from '../components/nofound'
import warning from '../components/warning'
import layoutdefault from '@/layout/layoutdefault'
import el from 'element-ui/src/locale/lang/el'
import login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layoutdefault',
    component: layoutdefault,
    redirect: '/home',
    children: [
      {
        name: Home,
        path: '/home',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        beforeEnter(to, from, next) {
          console.log('beforeEnter', to, from, next)
          next()
        },
        meta: {
          remark: '首页',
          activeMenu: '/home'
        }
      },
      {
        path: 'warn',
        name: 'warning',
        component: warning,
        meta: {
          remark: '警告'
        }
      },
      {
        path: '/learn',
        name: 'Learn',
        // component: learn
        component: () =>
          import(/* webpackChunkName: "about" */ '../components/learn.vue'),
        meta: {
          remark: '学习',
          activeMenu: '/learn'
        }
        // beforeEnter: ((to, from, next) => {
        //   alert('去登录吧');
        //   next('/login')
        // })
      },
      {
        path: '/methods',
        name: 'Methods',
        // component: learn
        component: () =>
          import(/* webpackChunkName: "methods" */ '../components/methods.vue'),
        meta: {
          remark: '方法',
          activeMenu: '/methods'
        },
        // redirect: '/learn'
      },
      {
        path: '/store',
        name: 'store',
        component: () => import(/* webpackChunkName: "store" */ '../components/store'),
        meta: {
          remark: '公共数据',
          // keepAlive: true,
          activeMenu: '/store'
        }
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
      import(/* webpackChunkName: "about" */ '../views/login'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/computed',
    name: 'computed',
    component: () => import(/* webpackChunkName: "computed" */'../components/computed'),
    meta: {
      remark: '计算'
    }
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import(/* webpackChunkName: "eCharts" */'../components/eCharts')
  },
  {
    path: '/404',
    name: 'nofound',
    component: nofound,
  },
  {
    path: '*',
    name: '',
    redirect: '/login'
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

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach', to, from)
  // 如果跳转的页面不出现，则跳转到 404 页面
  // if (to.matched.length === 0) {
  //   next('/404')
  // }
  let token = localStorage.getItem('username')
  let cookieInfo = cookie.getCookie('user')

    if (to.path === '/login'){
      if (cookieInfo && token) {
        console.log('登录了且去登录页，若已登录会跳转到home页')
        await next('/home')
      } else await next()
    } else if (!cookieInfo) {
      console.log('用户信息cookie过期')
      // _this.$notify({title: '警告', message: '用户信息已过期，请重新登录', type: 'warning'})
      alert('用户信息已过期，请重新登录')
      await next('/login')
      // next()
    } else if (!token) {
      console.log('未登录')
      // _this.$notify({title: '警告', message: '尚未登录，请先登录', type: 'warning'})
      alert('尚未登录，请先登录')
      await next('/login')
    }else {
      console.log('登录了去其他页面')
      await next()
      }


})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()

})

router.afterEach((to, from) => {
  console.log('afterEach')
})

export default router
