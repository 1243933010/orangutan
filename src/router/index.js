import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/meCenter',
    name:'meCenter',
    component: Layout,
    hidden:true,
    meta: {
      title: '个人中心',
      // icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [{
      path: 'meCenter',
      name: 'meCenter',
      component: () => import('@/views/systemManagement/me/index'),
      meta: { title: '' }
    },
    {
      path: 'password',
      name: 'password',
      component: () => import('@/views/systemManagement/me/password'),
      meta: { title: '修改密码', }
    }]
  },
  {
    path: '/messageCenter',
    name:'messageCenter',
    component: Layout,
    hidden:true,
    meta: {
      title: '消息中心',
      // icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [{
      path: 'messageCenter',
      name: 'messageCenter',
      component: () => import('@/views/systemManagement/messageCenter/index'),
      meta: { title: '消息中心' }
    },
    {
      path: 'detail',
      name: 'detail',
      component: () => import('@/views/systemManagement/messageCenter/detail'),
      meta: { title: '详情', }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/projectManagement',
    meta: {
      title: '项目管理',
      icon: 'svg_icon1',
      // icon:'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'projectManagement',
        component: () => import('@/views/projectManagement/index'),
        name: 'projectManagement',
        meta: { title: '项目管理', affix: true }
      },
      {
        path: 'projectManagementAdd',
        component: () => import('@/views/projectManagement/add'),
        name: 'projectManagementAdd',
        meta: { title: '项目管理新增', affix: true },
        hidden:true
      },{
        path: 'projectManagementDetail',
        component: () => import('@/views/projectManagement/detail'),
        name: 'projectManagementDetail',
        meta: { title: '项目管理详情', affix: true },
        hidden:true
      },
      {
        path: 'projectManagementEdit',
        component: () => import('@/views/projectManagement/edit'),
        name: 'projectManagementEdit',
        meta: { title: '项目管理编辑', affix: true },
        hidden:true
      },
      {
        path: 'ImplementationCommission',
        component: () => import('@/views/ImplementationCommission/index'),
        name: 'ImplementationCommission',
        meta: { title: '实施委托代理机构', affix: true }
      },
      {
        path: 'ImplementationCommission/edit',
        component: () => import('@/views/ImplementationCommission/edit'),
        name: 'ImplementationCommissionEdit',
        meta: { title: '实施委托代理机构编辑', affix: true },
        hidden:true
      },
      // {
      //   path: 'evaluation',
      //   component: () => import('@/views/evaluation/index'),
      //   name: 'evaluation',
      //   meta: { title: '开评标', affix: true }
      // },
      {
        path: 'contractManagement',
        name: 'contractManagement',
        component: () => import('@/views/contractManagement/index'),
        meta: { title: '合同管理', }
      },
      {
      path: 'contractManagement/edit',
      name: 'contractEdit',
      component: () => import('@/views/contractManagement/edit'),
      meta: { title: '合同编辑', },
      hidden:true
    }
    ]
  },
  {
    path: '/thirdProjects',
    component: Layout,
    redirect: '/thirdProjects',
    meta: { title: '第三方代理机构管理', icon: 'nested' },
    children: [{
      path: 'thirdProjects',
      name: 'thirdProjects',
      component: () => import('@/views/thirdProjects/index'),
      meta: { title: '第三方代理机构管理',}
    },
    {
      path: 'thirdProjects/edit',
      name: 'thirdProjectsEdit',
      hidden:true,
      component: () => import('@/views/thirdProjects/edit'),
      meta: { title: '第三方代理机构编辑',}
    },
  ]
  },
  // {
  //   path: '/contractManagement',
  //   component: Layout,
  //   redirect: '/contractManagement',
  //   meta: { title: '合同管理', icon: 'svg_icon3' },
  //   children: [{
  //     path: 'contractManagement',
  //     name: 'contractManagement',
  //     component: () => import('@/views/contractManagement/index'),
  //     meta: { title: '合同管理', }
  //   },
  //   {
  //     path: 'contractManagement/edit',
  //     name: 'contractEdit',
  //     component: () => import('@/views/contractManagement/edit'),
  //     meta: { title: '合同编辑', },
  //     hidden:true
  //   }]
  // },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics',
    meta: {
      title: '统计分析',
      icon: 'lock',
      // icon:'lock',
      roles: [ 'admin','editor'] // you can set roles in root nav
    },
    children: [{
      path: 'statistics',
      name: 'statistics',
      component: () => import('@/views/statistics/index'),
      meta: { title: '统计分析', }
    }]
  },
  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/user',
    meta: { title: '系统管理', icon: 'table' },
    roles: ['admin', 'editor'],
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/systemManagement/user/index'),
      meta: { title: '用户管理',  }
    },
    {
      path: 'department',
      name: 'department',
      component: () => import('@/views/systemManagement/department/index'),
      meta: { title: '部门管理', }
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('@/views/systemManagement/roles/index'),
      meta: { title: '角色管理',  }
    },
    {
      path: 'messageNotification',
      name: 'messageNotification',
      component: () => import('@/views/systemManagement/messageNotification/index'),
      meta: { title: '消息通知管理',  }
    },
    {
      path: 'messageNotification/edit',
      name: 'messageNotificationEdit',
      component: () => import('@/views/systemManagement/messageNotification/add'),
      meta: { title: '消息通知编辑', },
      hidden: true
    },
    {
      path: 'log',
      name: 'log',
      component: () => import('@/views/systemManagement/log/index'),
      meta: { title: '日志管理',  }
    },
    {
      path: 'agent',
      name: 'agent',
      component: () => import('@/views/systemManagement/agent/index'),
      meta: { title: '三方代理管理',  }
    },
  ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   hidden:true,
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
