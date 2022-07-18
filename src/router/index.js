import VueRouter from 'vue-router'
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Login.vue'),
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
      },
  ],
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
