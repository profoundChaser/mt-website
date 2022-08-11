import axios from 'axios'
import { showFullScreenLoading, hideFullScreenLoading } from './loading'
const options = {
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 5000,
}
const request = axios.create(options)
//是否隐藏使用loading
const checkLoadings = ['/previewAdd','/downloadsAdd','/getImageByTime']
let isHiddenLoading = true
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
    return Promise.reject(err)
  }
)

export default request
