import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './user/user'
import headerStore from './header/header'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    headerStore
  },
})
