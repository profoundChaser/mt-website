import request from '@/utils/request'

//获取全部图片分类
export function getAllCategories(){
    return request.get('/categories')
}