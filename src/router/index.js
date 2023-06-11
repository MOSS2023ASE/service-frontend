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
    path: '/issueInfoDetail',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'issueInfoDetail',
        props: true,
        component: () => import('@/views/issueInfo/issueInfoDetail')
      },
    ]
  },
  {
    path: '/userInfo',
    component: Layout,
    redirect: '/userInfo/index',
    children: [
      {
        path: 'index',
        name: 'userInfo',
        component: () => import('@/views/userInfo/userInfo'),
        meta: {title: '个人信息', icon: 'el-icon-user'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/search',
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/searchIssue/index'),
        meta: {title: '搜索问题', icon: 'el-icon-search'},
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/post',
    component: Layout,
    redirect: '/path/index',
    children: [
      {
        path: 'index',
        name: 'post',
        component: () => import('@/views/postIssue/index'),
        meta: {title: '发布问题', icon: 'el-icon-plus', roles: [0]}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/userManage/userCreate'),
        meta: {title: '用户管理', icon: 'el-icon-user-solid'}
      },
      {
        path: 'label',
        name: 'label',
        component: () => import('@/views/userManage/labelManage'),
        meta: {title: '标签管理', icon: 'el-icon-s-flag'}
      },
      {
        path: 'send',
        name: 'send',
        component: () => import('@/views/userManage/postMessage'),
        meta: {title: '发布通知', icon: 'el-icon-s-comment'}
      },
      {
        path: 'stats',
        name: 'stats',
        component: () => import('@/views/userManage/workStat'),
        meta: {title: '统计图表', icon: 'el-icon-s-data'}
      },
    ],
    meta: {title: '管理端', icon: 'el-icon-s-tools', roles: [2]}
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
router.afterEach((to, from) => {
  if (from.name !== null) {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }
});


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
