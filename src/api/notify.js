import request from '@/utils/request'

export function clear(
  jwt, //: string
) {
  return request({
    url: '/notification/clear_all',
    method: 'post',
    data: {
      jwt: jwt
    }
  })
}

export function read_one(
  jwt, //: string
  id,
) {
  return request({
    url: '/notification/get',
    method: 'post',
    data: {
      jwt: jwt,
      notification_id: id
    }
  })
}

export function get_all(
  jwt, //: string
  page_no,
  notification_per_page,
) {
  return request({
    url: '/notification/user_receive',
    method: 'post',
    data: {
      jwt: jwt,
      page_no:page_no,
      notification_per_page:notification_per_page
    }
  })
}

