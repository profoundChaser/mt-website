import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
Vue.config.productionTip = false
import router from './router/index'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element'

Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
