import client from './client'

let api_url_head:string = 'http://localhost:3000'

export function update_tag(
  jwt: string,
  tag_id: number,
  content: string
) {
  return client.POST(api_url_head + '/tag/update', {
    data: {
      jwt: jwt,
      tag_id: tag_id,
      content: content
    }
  })
}

export function delete_tag(
  jwt: string,
  tag_id: number
) {
  return client.POST(api_url_head + '/tag/delete', {
    data: {
      jwt: jwt,
      tag_id: tag_id,
    }
  })
}

export function create_tag(
  jwt: string,
  content: string
) {
  return client.POST(api_url_head + '/tag/create', {
    data: {
      jwt: jwt,
      content: content
    }
  })
}

export function get_all_tags(
  jwt: string,
  tag_id: number,
  content: string
) {
  return client.POST(api_url_head + '/tag', {
    data: {
      jwt: jwt,
      tag_id: tag_id,
      content: content
    }
  })
}

