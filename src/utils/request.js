import axios from 'axios'
import { showFullScreenLoading,hideFullScreenLoading} from './loading'
const options = {
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 5000,
}
const request = axios.create(options)

request.interceptors.request.use(
  (config) => {
    const token=localStorage.getItem('token')
    if(token){
        config.headers=config.headers||{}
        config.headers['Authorization']=token
    }
    console.log(config)
    showFullScreenLoading()
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    hideFullScreenLoading()
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request