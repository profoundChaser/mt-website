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
        title: '登录',
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
      redirect:'/me/info',
      children:[
        {
          path:'/me/info',
          meta:{
            title:'个人信息'
          },
          component:()=>import('../views/me/child/userInfo/Index.vue')
        },
        {
          path:'/me/friends',
          meta:{
            title:'好友聊天'
          },
          component:()=>import('../views/me/child/friends/Chat.vue')
        }
      ]
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
      ],
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/error/404.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to)
  if (to.matched.length == 0) {
    router.push('/404')
  }
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta.title
  NProgress.done()
})

export default router
