import request from '@/utils/request'

export function update_tag(
  jwt, //: string,
  tag_id, //: number,
  content //: string
) {
  return request({
    url: '/tag/update',
    method: 'post',
    data: {
      jwt: jwt,
      tag_id: tag_id,
      content: content
    }
  })
}

export function delete_tag(
  jwt, //: string,
  tag_id //: number
) {
  return request({
    url: '/tag/delete',
    method: 'post',
    data: {
      jwt: jwt,
      tag_id: tag_id,
    }
  })
}

export function create_tag(
  jwt, //: string,
  content //: string
) {
  return request({
    url: '/tag/create',
    method: 'post',
    data: {
      jwt: jwt,
      content: content
    }
  })
}

export function get_all_tags(
  jwt, //: string,
  tag_id, //: number,
  content //: string
) {
  return request({
    url: '/tag',
    method: 'post',
    data: {
      jwt: jwt,
      tag_id: tag_id,
      content: content
    }
  })
}

