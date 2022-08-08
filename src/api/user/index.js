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
  return request.put('/updateUser', params)
}

//修改密码
export function updateUserPwd(params) {
  return request.put('/updatePwd', params)
}

//校验密码
export function validateUserPwd(params) {
  return request.post('/validatePwd', params)
}

//获取校验码
export function getCode(params) {
  return request.post('/sendEmail', params)
}

//进行校验
export function verifyCode(params) {
  return request.post('/verifyCode', params)
}

export function updateAvatar(formData) {
  return request.put('/updateAvatar', formData)
}
//获取所有用户
export function getAllUsers(params={}) {
  return request.get('/users',params)
}

export function updateUser(params) {
  return request.post('/deleteUser', params)
}

export function deleteUser(id) {
  return request.post('/deleteUser', { id })
}

export function deleteUsers(params) {
  return request.post('/deleteUsers', params)
}
