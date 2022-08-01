import request from '@/utils/request'

//注册用户
export function register(params) {
  return request.post('/register', params)
}

//登录 包含邮箱和密码
export function login(params) {
  return request.post('/login', params)
}

//修改用户信息
export function updateUserInfo(params) {
  return request.post('/updateUser', params)
}

//修改密码
export function updateUserPwd(params) {
  return request.post('/updatePwd', params)
}

//校验密码
export function validateUserPwd(params) {
  return request.post('/validatePwd', params)
}

export function getCode(params) {
  return request.post('/sendEmail', params)
}

export function verifyCode(params) {
  return request.post('/verifyCode', params)
}

