import request from '@/utils/request'

export function fetchNotify(query) {
  return request({
    //url: 'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/notify',
    url: '/notify/get_list',
    method: 'post',
    params: query
  })
}
export function createNotify(query) {
  return request({
    //url: 'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/notify',
    url: '/notify/create',
    method: 'post',
    params: query
  })
}
export function readNotify(query) {
  return request({
    //url: 'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/notify',
    url: '/notify/read',
    method: 'post',
    params: query
  })
}
