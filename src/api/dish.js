import request from '@/utils/request'

export function fetchList(query) {
  return request({
    //url:'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/favor',
    url: '/dish/get_list',
    method: 'post',
    params: query
  })
}

export function fetchDish(id) {
  return request({
    url: '/dish/detail',
    method: 'get',
    params: { id }
  })
}

export function createDish(data) {
  return request({
    url: '/dish/create',
    method: 'post',
    data
  })
}

export function updateDish(data) {
  return request({
    url: '/dish/update',
    method: 'post',
    data
  })
}

export function deleteDish(data) {
  return request({
    url: '/dish/delete',
    method: 'delete',
    data
  })
}
