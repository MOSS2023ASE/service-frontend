import request from '@/utils/request'

export function fetchSuggest(query) {
  return request({
    //url:"https://mock.presstime.cn/mock/639300f95de3e00085b4818d/example/suggest_list",
    url: '/suggest/get_list',
    method: 'post',
    params: query
  })
}

export function createSuggest(data) {
  return request({
    url: "/suggest/create",
    method: 'post',
    data
  })
}
