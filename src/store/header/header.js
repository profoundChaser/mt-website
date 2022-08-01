export default {
  namespaced: true,
  state: {
    offsetHeight:''
  },
  getters: {
    offsetHeight: (state) => state.offsetHeight
  },
  actions: {},
  mutations: {
    SET_OFFSETHEIGHT(state, offsetHeight) {
      state.offsetHeight = offsetHeight
    },
  },
}
