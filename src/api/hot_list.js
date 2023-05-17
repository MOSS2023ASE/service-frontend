import request from '@/utils/request'

export function get_active_users(
  jwt, //: string
) {
  return request({
    url: '/user/active_users',
    method: 'post',
    data: {
      jwt: jwt,
    }
  })
}

export function get_popular_issues(
  jwt, //: string
) {
  return request({
    url: '/issue/popular_issues',
    method: 'post',
    data: {
      jwt: jwt,
    }
  })
}
