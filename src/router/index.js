import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    //component: () => import('@/views/management/index'),
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 新增放在下面
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'issueInfoDetail',
        name: 'issueInfoDetail',
        component: () => import('@/views/issueInfo/issueInfoDetail')
      },
      {
        path: 'userInfo',
        component: () => import('@/views/userInfo/userInfo')
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/searchIssue/index'),
        meta: {title: '搜索问题', icon: 'el-icon-search', roles: ['admin', 'editor', 'visitor']},
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'userCreate',
        name: 'userCreate',
        component: () => import('@/views/userManage/userCreate'),
        meta: {title: '用户管理', icon: 'el-icon-user'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
