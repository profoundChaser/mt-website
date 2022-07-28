import request from '@/utils/request'

//注册用户
export function register(params) {
  return request.post('/register',params)
}

//登录 包含邮箱和密码
export function login(params) {
  return request.post('/login',params)
}
export function home(){
    return request.get('/')
}