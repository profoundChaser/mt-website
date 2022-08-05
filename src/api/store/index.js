import request from '@/utils/request'

export function getAllStores(id) {
  return request.get(`/stores/${id}`)
}

export function addStore(params) {
  return request.post('/addStore',params)
}

export function deleteStore(id) {
  return request.delete(`/deleteStore/${id}`)
}
