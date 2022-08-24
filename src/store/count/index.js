import method from './const'

export default {
  namespaced: true,
  state: {
    num: 0,
  },
  getters: {
    num: (state) => state.num,
  },
  actions: {
    //条件需要时则进行actions的使用
    incrementOddAction({ commit, state }) {
      if (state.num % 2 !== 0) {
        commit(method.INCREMENT)
      }
    },
    incrementAsyncAction({ commit },{val,ms}) {
      console.log(ms,val)
      setTimeout(() => {
        commit(method.INCREMENT,val)
      },ms)
    },
  },
  mutations: {
    [method.INCREMENT](state, val) {
      state.num += val
    },
    [method.DECREMENT](state, val) {
      state.num -= val
    },
    [method.MULTIPLY](state, val) {
      state.num *= val
    },
    [method.DIVIDE](state, val) {
      state.num /= val
    },
  },
}
