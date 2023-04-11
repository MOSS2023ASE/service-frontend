import client from './client'

let api_url_head:string = 'http://localhost:3000'

export function get_issue_all_comments(
  jwt: string,
  issue_id: number
) {
  return client.POST(api_url_head + '/subject', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function delete_comment(
  jwt: string,
  comment_id: number
) {
  return client.POST(api_url_head + '/issue/comment', {
    data: {
      jwt: jwt,
      comment_id: comment_id
    }
  })
}

export function update_comment(
  jwt: string,
  comment_id: number,
  content: string
) {
  return client.POST(api_url_head + '/issue/comment/update', {
    data: {
      jwt: jwt,
      comment_id: comment_id,
      content: content
    }
  })
}

export function create_comment(
  jwt: string,
  issue_id: number,
  content: string
) {
  return client.POST(api_url_head + '/issue/comment/create', {
    data: {
      jwt: jwt,
      issue_id: issue_id,
      content: content
    }
  })
}
