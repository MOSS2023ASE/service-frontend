import request from '@/utils/request'

export function fetchResult(query) {
  return request({
    //url: 'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/favor',
    url: '/dish/generate',
    method: 'post',
    params: query
  })
}
export function fetchAutoRec(query) {
  return request({
    //url: 'https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/favor',
    url: '/record/records',
    method: 'post',
    params: query
  })
}
