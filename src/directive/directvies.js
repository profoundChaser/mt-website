import lazyLoad from './lazyLoad'
// 自定义指令
const directives = {
  lazyLoad
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}