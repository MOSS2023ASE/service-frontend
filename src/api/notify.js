import request from '@/utils/request'

export function clear_all_notification(
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

export function read_one_notification(
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

export function get_all_notification(
  jwt, //: string
) {
  return request({
    url: '/notification/user_receive',
    method: 'post',
    data: {
      jwt: jwt,
    }
  })
}

export function admin_broadcast(
  jwt, //: string
  title, //: string
  content, //: string
  category, //: number
) {
  return request({
    url: '/notification/broadcast',
    method: 'post',
    data: {
      jwt: jwt,
      title: title,
      content: content,
      category: category
    }
  })
}
