export default {
  namespaced: true,
  state: {
      userInfo:{}
  },
  getters: {
    userInfo:state=>state.userInfo
  },
  actions: {
  },
  mutations: {
    STORE_USERINFO(state,userInfo){
      state.userInfo=userInfo
    }
  }
}