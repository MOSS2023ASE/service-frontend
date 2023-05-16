import request from '@/utils/request'

export function save_draft(
  jwt, //: string
  chapter_id, //: number,
  title, //: string,
  content, //: string,
  anonymous, //: number
) {
  return request({
    url: '/issue/save_draft',
    method: 'post',
    data: {
      jwt: jwt,
      chapter_id: chapter_id,
      title: title,
      content: content,
      anonymous: anonymous
    }
  })
}

export function load_draft(
  jwt, //: string
) {
  return request({
    url: '/issue/load_draft',
    method: 'post',
    data: {
      jwt: jwt,
    }
  })
}
