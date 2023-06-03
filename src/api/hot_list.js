import request from '@/utils/request'

// 已对接
export function get_active_users(
  jwt, //: string
  top_k, //: number
) {
  return request({
    url: '/user/active_users',
    method: 'post',
    data: {
      jwt: jwt,
      top_k: top_k,
    }
  })
}

export function get_popular_issues(
  jwt, //: string
  top_k, //: number
) {
  return request({
    url: '/user/get_popular_issue',
    method: 'post',
    data: {
      jwt: jwt,
      top_k: top_k
    }
  })
}
