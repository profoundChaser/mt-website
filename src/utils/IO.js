import { compose } from '@/utils/utils.js'
class IO {
  constructor(value) {
    this.value = value
  }
  static of(value) {
    return new IO(value)
  }
  //通过requireContext获取到require.context()的返回值
  getAllFiles(requireContext, url, options) {
    let iconImages = []
    requireContext.keys().map((req) => {
      let iconName = req.split('./')[1]
      const urlArr = iconName.split('.')
      const type = urlArr[urlArr.length - 1]
      const comUrlArr = url.split('/')
      const needUrl = comUrlArr.slice(2, comUrlArr.length).join('/')
      iconImages.push({
        src: `${needUrl}/${iconName}`,
        isVideo: type === 'mp4' ? true : false,
      })
    })
    return new IO(iconImages)
  }
  map(fn) {
    let files
    if (fn) {
      files = compose(fn, this.value)
    } else {
      files = this.value.map((item) => {
        return {
          img: require('@/assets/' + item.src), //路径会被转化，带有img
          isVideo: item.isVideo,
          isStore: false, //用于收藏标识
        }
      })
    }
    return files
  }
  //合并多个文件的数据
  mergeFiles(...args) {
    const res = []
    for (let i = 0; i < args.length; i++) {
      res.push(...args[i])
    }
    return res
  }
}

export default IO
