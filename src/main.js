import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import './assets/fonts/iconfont.css'
import 'animate.css'
import router from './router/index'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element'

//引入自定义指令
import lazyLoad from './directive/lazyLoad.js'
Vue.directive('lazy', lazyLoad)

//登录滑块校验
import huakuai from 'huakuai-vue'
Vue.use(huakuai)

//使用状态管理
import store from './store/index'

//引入echarts
const echarts = require('echarts')
Vue.prototype.$echarts = echarts

//引入时间
var dayjs = require('dayjs')
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.use(VueRouter)
const vue = new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    //事件总线
    Vue.prototype.$bus = this
  },
}).$mount('#app')

export default vue
