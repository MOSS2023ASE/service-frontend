import request from '@/utils/request'

export function createComment(data) {
  return request(({
    url: '/comment/create',
    method: 'post',
    data
  }))
}

export function deleteComment(data) {
  return request(({
    url: '/comment/delete',
    method: 'post',
    data
  }))
}

export function getComments(data) {
  return request({
    //url: 'https://mockapi.eolink.com/xMPPXMq6481c34445d9d770cd1eaa87bd35815f948f7eb5/comment/get_list',
    url: '/comment/get_list',
    method: 'post',
    data
  })
}
