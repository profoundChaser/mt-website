import VueRouter from 'vue-router'
//进度条配置
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import Login from '../views/login/Login.vue'
NProgress.configure({ showSpinner: false })
const imgRouter = ['mv', 'scenery']
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/Register.vue'),
      meta: {
        title: '注册',
      },
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
      },
      component: () => import('../views/home/Home.vue'), // 注意这里要带上 文件后缀.vue
    },
    {
      path: '/',
      redirect: '/home', //重定向
    },
    {
      path: '/me',
      name: 'me',
      meta: {
        title: '我的',
      },
      component: () => import('../views/me/Me.vue'),
      redirect: '/me/info',
      children: [
        {
          path: '/me/store',
          meta: {
            title: '我的收藏',
          },
          component: () => import('../views/me/child/store/Index.vue'),
        },
        {
          path: '/me/info',
          meta: {
            title: '个人信息',
          },
          component: () => import('../views/me/child/userInfo/Index.vue'),
        },
        {
          path: '/me/friends',
          meta: {
            title: '好友聊天',
          },
          component: () => import('../views/me/child/friends/Chat.vue'),
        },
        {
          path:'/me/users',
          meta:{
            title:'用户管理'
          },
          component:()=>import('../views/me/admin/Users.vue')
        },
        {
          path:'/me/roles',
          meta:{
            title:'角色管理'
          },
          component:()=>import('../views/me/admin/Roles.vue')
        },
        {
          path:'/me/images',
          meta:{
            title:'图片管理'
          },
          component:()=>import('../views/me/admin/Images.vue')
        },
        {
          path:'/me/imgcategories',
          meta:{
            title:'图片类型管理'
          },
          component:()=>import('../views/me/admin/ImgCategory.vue')
        },
        {
          path:'/me/statistics',
          meta:{
            title:'用户浏览下载统计'
          },
          component:()=>import('../views/me/admin/Statistic.vue')
        },
        {
          path:'/me/logs',
          meta:{
            title:'日志管理'
          },
          component:()=>import('../views/me/admin/Logs.vue')
        }
      ],
    },
    {
      path: '/onePic',
      name: 'onePic',
      meta: {
        title: '图片',
      },
      component: () => import('../views/onepic/OnePic.vue'),
    },
    {
      path: '/imgs',
      name: 'imgs',
      meta: {
        title: '图片大全',
      },
      component: () => import('../views/imgs/CategoryImgsAll.vue'),
      redirect: '/imgs/mv',
      children: [
        {
          path: '/imgs/mv',
          name: 'mv',
          meta: {
            title: '美女',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/scenery',
          name: 'scenery',
          meta: {
            title: '风景',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/buildings',
          name: 'buildings',
          meta: {
            title: '建筑',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/delicacy',
          name: 'delicacy',
          meta: {
            title: '美食',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/animals',
          name: 'animals',
          meta: {
            title: '动物',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/life',
          name: 'life',
          meta: {
            title: '生活',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/games',
          name: 'games',
          meta: {
            title: '游戏',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/plant',
          name: 'plant',
          meta: {
            title: '植物',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/comic',
          name: 'comic',
          meta: {
            title: '动漫',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
        {
          path: '/imgs/sport',
          name: 'sport',
          meta: {
            title: '动漫',
          },
          component: () => import('../views/imgs/CategoryImgsAll.vue'),
        },
      ],
    },
    {
      path: '/forgetPwd',
      name: '/forgetPwd',
      meta: {
        title: '重置密码',
      },
      component: () => import('../views/forgetPwd/ForgetPwd.vue'),
    },
    {
      path: '/upload',
      name: '/upload',
      meta: {
        title: '文件上传',
      },
      component: () => import('../views/upload/Upload.vue'),
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '错误访问',
      },
      component: () => import('../views/error/404.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.length == 0) {
    router.push('/404')
  }
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta.title
  NProgress.done()
})

//解决重复跳转报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
