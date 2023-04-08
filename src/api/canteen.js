import request from '@/utils/request'

export function createCanteen(data) {
  return request(({
    url: '/canteen/create',
    method: 'post',
    data
  }))
}

export function updateCanteen(data) {
  return request(({
    url: '/canteen/update',
    method: 'post',
    data
  }))
}

export function deleteCanteen(data) {
  return request(({
    url: '/canteen/delete',
    method: 'delete',
    data
  }))
}

export function getCanteenList(data) {
  return request(({
    url: '/canteen/get_list',
    method: 'post',
    data
  }))
}

