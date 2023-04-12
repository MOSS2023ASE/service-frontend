import request from '@/utils/request'


export function get_issue_all_comments(
  jwt, //: string,
  issue_id //: number
) {
  return request({
    url: '/subject',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function delete_comment(
  jwt, //: string,
  comment_id //: number
) {
  return request({
    url: '/issue/comment',
    method: 'post',
    data: {
      jwt: jwt,
      comment_id: comment_id
    }
  })
}

export function update_comment(
  jwt, //: string,
  comment_id, //: number,
  content //: string
) {
  return request({
    url: '/issue/comment/update',
    method: 'post',
    data: {
      jwt: jwt,
      comment_id: comment_id,
      content: content
    }
  })
}

export function create_comment(
  jwt, //: string,
  issue_id, //: number,
  content //: string
) {
  return request({
    url: '/issue/comment/create',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
      content: content
    }
  })
}
