import request from '@/utils/request'

export function fetchFavor(query) {
  return request({
    //url:'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/favor_list',
    url: '/user/get_favorite',
    method: 'post',
    params: query
  })
}

export function addFavor(query) {
  return request({
    //url:'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/add_favor',
    url: '/user/add_favorite',
    method: 'post',
    params: query
  })
}

export function delFavor(query) {
  return request({
    //url:'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/add_favor',
    url: '/user/delete_favorite',
    method: 'post',
    params: query
  })
}

export function isFavor(query) {
  return request({
    //url:'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/isfavor',
    url: '/dish/favor',
    method: 'post',
    params: query
  })
}
