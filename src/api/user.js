import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/get_profile',
    method: 'get',
    params: {token}
  })
}

export function getProfile(data) {
  return request(({
    url: '/user/get_profile',
    method: 'post',
    data
  }))
}

export function updateInfo(data) {
  return request(({
    url: '/user/update_info',
    method: 'post',
    data
  }))
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function uploadImage() {
  return request({
    url: 'http://www.imgtp.com/api/upload',
    data,
    method: 'post',
    header: {'Authorization': 'a7e9d40943d7d6876ed698cdd25dfb73'}
  })
}
