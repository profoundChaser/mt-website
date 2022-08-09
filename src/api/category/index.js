import request from '@/utils/request'

//获取全部图片分类
export function getAllCategories(params) {
  return request.get('/categories', params)
}

export function addCategory(params) {
  return request.post('/addCategory', params)
}

export function updateCategory(params) {
  return request.post('/updateCategory', params)
}

export function deleteCategory(id) {
  return request.post(`/deleteCategory`, { id })
}

export function deleteCategories(idList) {
  return request.post(`/deleteCategories`, { idList })
}
