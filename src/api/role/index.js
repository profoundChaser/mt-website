import request from '@/utils/request'

export function getAllRoles() {
  return request.get('/roles')
}

export function addRole(params) {
  return request.post('/addRole',params)
}

export function updateRole(params) {
  return request.post('/updateRole',params)
}

export function deleteRole(id) {
  return request.post(`/deleteRole`,{id})
}

export function deleteRoles(idList) {
  return request.post(`/deleteRoles`,{idList})
}
