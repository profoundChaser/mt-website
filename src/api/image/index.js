import request from '@/utils/request'

export function uploadImages(formData) {
  return request.post('/uploadImages', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function getAllImages(params = {}) {
  return request.get('/images', params)
}

export function updateImage(id, params) {
  return request.put(`/images/${id}`, params)
}

//删除图片
export function deleteImage(params) {
  return request.post('/updateImage', params)
}

export function getRandomImage() {
  return request.get('/randomImage')
}

export function previewImgAdd(id) {
  return request.post('/previewAdd', { id })
}
