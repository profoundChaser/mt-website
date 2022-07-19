import baseImg from '@/assets/gif/loading2.gif'

let timer = null

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      !entry.target.isLoaded && showImage(entry.target, entry.target.data_src)
    }
  })
})

function showImage(el, imgSrc) {
  const img = new Image()
  img.src = imgSrc
  img.onload = () => {
    el.src = imgSrc
    el.isLoaded = true
  }
}

export default {
  inserted(el, binding, vnode) {
    if (timer) {
      clearTimeout(timer)
    }
    el.src = baseImg
    el.data_src = binding.value
    observer.observe(el)
    const vm = vnode.context

    timer = setTimeout(() => {
      vm.$on('hook:beforeDestroy', () => {
        observer.disconnect()
      })
    }, 20)
  },
  // 图片更新触发
  update(el, binding) {
    el.isLoaded = false
    el.data_src = binding.value
  }
}