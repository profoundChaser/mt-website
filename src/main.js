import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import './assets/fonts/iconfont.css'
import router from './router/index'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element'

//引入自定义指令
import lazyLoad from './directive/lazyLoad.js'
Vue.directive('lazy',lazyLoad)


Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
