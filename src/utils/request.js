import axios from 'axios'
import { showFullScreenLoading, hideFullScreenLoading } from './loading'
const options = {
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 5000,
}
const request = axios.create(options)

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = token
    }
    showFullScreenLoading()
    return config
  },
  (err) => {
    hideFullScreenLoading()
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    hideFullScreenLoading()
    return res.data
  },
  (err) => {
    hideFullScreenLoading()
    return Promise.reject(err)
  }
)

export default request
