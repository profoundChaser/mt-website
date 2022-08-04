import request from '@/utils/request'

export function uploadImages(formData) {
  return request.post('/uploadImages', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function getAllImages(id = 1) {
  return request.get('/images', id)
}
