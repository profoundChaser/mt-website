import axios from 'axios'
import { showFullScreenLoading, hideFullScreenLoading } from './loading'
import vue from '../main'
import router from '../router'

const options = {
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 10000,
}
const request = axios.create(options)
//是否隐藏使用loading
const checkLoadings = ['/previewAdd', '/downloadsAdd', '/getImageByTime']
//需要token权限方可操作的请求
const needTokens = ['/previewAdd']

let isHiddenLoading = true
let checkTokenFlag = true

request.interceptors.request.use(
  (config) => {
    if (checkLoadings.includes(config.url)) {
      isHiddenLoading = false
    }
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = token
    }
    if (isHiddenLoading) {
      showFullScreenLoading()
    }
    return config
  },
  (err) => {
    if (hideFullScreenLoading) {
      hideFullScreenLoading()
    }
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    if (hideFullScreenLoading) {
      hideFullScreenLoading()
    }
    return res.data
  },
  (err) => {
    if (hideFullScreenLoading) {
      hideFullScreenLoading()
    }
    if (err.response.data.status === 401) {
      vue
        .$msgBox({
          title: '错误提示',
          message: '您的登录信息已失效，请重新登录',
          showCancelButton: false,
        })
        .then((val) => {
          router.push('/login')
        })
        .catch(() => {
          console.log('cancel')
        })
    } else {
      vue.$message.error({
        type: 'error',
        content: '系统出现错误',
      })
    }
    return Promise.reject(err)
  }
)
export default request
