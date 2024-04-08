import request from '@/utils/request'

/**
 * 获取图片数据列表
 */
export const getPexelsList = (params) => {
  return request.get('/pexels/list', { params })
}

/**
 * 获取搜索提示
 */
export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}

/**
 * 获取推荐主题
 */
export const getThemes = () => {
  return request.get('/pexels/themes')
}
