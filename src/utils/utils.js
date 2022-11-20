//防抖
export const debounce = function (cb, ms) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      cb.apply(this, arguments)
    }, ms)
  }
}
//节流
export const throttle = function (fn, ms) {
  let flag = true
  return function () {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = true
    }, ms)
  }
}

export const throttle2 = function (fn, ms) {
  let timer = null
  return function () {
    if (timer) return false
    timer = setTimeout(() => {
      clearTimeout(timer)
      fn.apply(this, arguments)
      timer = null
    }, ms)
  }
}

export const throttle3 = function (fn, ms) {
  let lastTime = null
  return (...args) => {
    let waitTime = Date.now()
    if (lastTime) {
      if (waitTime - lastTime >= ms) {
        fn.apply(this, args)
        lastTime = waitTime
      }
    } else {
      fn.apply(this, args)
      lastTime = waitTime
    }
  }
}
//说明函数
const resolver = (...args) => JSON.stringify(args)
//纯函数可缓存 记忆化
export const memoize = function (func, resolver) {
  const cache = {}
  return (...args) => {
    const key = resolver(...args)
    if (cache[key]) {
      return cache[key]
    } else {
      return (cache[key] = func(...args))
    }
  }
}

//科里化
export const curry = function (func) {
  let length = func.length
  let curried = (...args) => {
    if (args.length < length) {
      return (...rest) => curried(...args, ...rest)
    }
    return func(...args)
  }
  return curried
}

//组合
export const compose = function (...args) {
  let { length } = args
  if (length === 1) {
    return (str) => args[0](str)
  }
  return args.reduceRight((acc, cur) => (str) => cur(acc(str)))
}

//取随机值
export const getRdNum = function (min, max) {
  return ~~(Math.random() * (max - min) + min)
}

export const createColor = function () {
  return `rgb(${getRdNum(100, 255)}, ${getRdNum(100, 255)}, ${getRdNum(100, 255)})`
}

//获取被卷去的高度
export function st() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

//获取屏幕自身的高度
export function wh() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

//获取可滚动的高度
export function sh() {
  return document.documentElement.scrollHeight || document.body.scrollHeight
}

//获取屏幕自身的宽高

export function getClientW() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height:
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  }
}

//交换数组的元素
export function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

//重定向到某个页面
export const redirect = (url) => (location.href = url)

//打开新窗口
export const newWindow = (url) => window.open(url)

//可中断的循环
export const abortForEach = (arr, cb) => {
  try {
    arr.forEach((item, index) => {
      cb(item, index)
    })
  } catch (error) {
    return error
  }
}

//获取最大值
export const getMax = function (arr){
  // return Math.max(...arr)
  if(!arr.length) return 
  let max = arr[0]
  arr.forEach(item=>{
    if(max < item){
      max = item
    }
  })
  return max
}