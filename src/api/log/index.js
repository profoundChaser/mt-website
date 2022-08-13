import request from '@/utils/request'

export function getAllLogs() {
  return request.get('/logs')
}

export function addLog(params) {
  return request.post('/addLog',params)
}

export function updateLog(params) {
  return request.post('/updateLog',params)
}

export function deleteLog(id) {
  return request.post(`/deleteLog`,{id})
}

export function deleteLogs(idList) {
  return request.post(`/deleteLogs`,{idList})
}
