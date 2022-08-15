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
    const code = err.response.status
    if (code === 401) {
      vue
        .$msgBox({
          title: '错误提示',
          message: '您的token已失效，可停留在该页面，或请重新登录',
          showCancelButton: false,
        })
        .then((val) => {
          router.push('/login')
        })
        .catch(() => {
          console.log('cancel')
        })
    } else if (code === 500) {
      vue.$message.error({
        type: 'error',
        message: '服务器出现错误',
        showCancelButton: false,
      })
      router.replace('/500')
    }
    return Promise.reject(err)
  }
)
export default request
