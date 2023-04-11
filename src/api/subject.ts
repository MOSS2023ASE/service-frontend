import client from './client'

let api_url_head:string = 'http://localhost:3000'

export function get_all_subjects(
  jwt: string
) {
  return client.POST(api_url_head + '/subject', {
    data: {
      jwt: jwt
    }
  })
}

export function update_chapter(
  jwt: string,
  chapter_id: number,
  name: string,
  content: string
) {
  return client.POST(api_url_head + '/chapter/update', {
    data: {
      jwt: jwt,
      chapter_id: chapter_id,
      name: name,
      content: content
    }
  })
}

export function update_subject(
  jwt: string,
  subject_id: number,
  name: string,
  content: string
) {
  return client.POST(api_url_head + 'subject/update', {
    data: {
      jwt: jwt,
      subject_id: subject_id,
      name: name,
      content: content
    }
  })
}

export function delete_chapter(
  jwt: string,
  chapter_id: number
) {
  return client.POST(api_url_head + '/chapter/delete', {
    data: {
      jwt: jwt,
      chapter_id: chapter_id
    }
  })
}

export function delete_subject(
  jwt: string,
  subject_id: number
) {
  return client.POST(api_url_head + '/subject/delete', {
    data: {
      jwt: jwt,
      chapter_id: subject_id
    }
  })
}

export function create_chapter(
  jwt: string,
  name: string,
  content: string,
  subject_id: number
) {
  return client.POST(api_url_head + '/chapter/create', {
    data: {
      jwt: jwt,
      name: name,
      content: content,
      subject_id: subject_id
    }
  })
}

export function create_subject(
  jwt: string,
  name: string,
  content: string
) {
  return client.POST(api_url_head + '/subject/create', {
    data: {
      jwt: jwt,
      name: name,
      content: content
    }
  })
}

export function get_subject_all_chapters(
  jwt: string,
  subject_id: number
) {
  return client.POST(api_url_head + '/chapter', {
    data: {
      jwt: jwt,
      subject_id: subject_id
    }
  })
}
