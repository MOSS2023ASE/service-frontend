import request from '@/utils/request'

export function get_all_subjects(
  jwt //: string
) {
  return request({
    url: '/subject',
    method: 'post',
    data: {
      jwt: jwt
    }
  })
}

export function update_chapter(
  jwt, //: string,
  chapter_id, //: number,
  name, //: string,
  content //: string
) {
  return request({
    url: '/chapter/update',
    method: 'post',
    data: {
      jwt: jwt,
      chapter_id: chapter_id,
      name: name,
      content: content
    }
  })
}

export function update_subject(
  jwt, //: string,
  subject_id, //: number,
  name, //: string,
  content //: string
) {
  return request({
    url: 'subject/update',
    method: 'post',
    data: {
      jwt: jwt,
      subject_id: subject_id,
      name: name,
      content: content
    }
  })
}

export function delete_chapter(
  jwt, //: string,
  chapter_id //: number
) {
  return request({
    url: '/chapter/delete',
    method: 'post',
    data: {
      jwt: jwt,
      chapter_id: chapter_id
    }
  })
}

export function delete_subject(
  jwt, //: string,
  subject_id //: number
) {
  return request({
    url: '/subject/delete',
    method: 'post',
    data: {
      jwt: jwt,
      chapter_id: subject_id
    }
  })
}

export function create_chapter(
  jwt, //: string,
  name, //: string,
  content, //: string,
  subject_id, //: number
) {
  return request({
    url: '/chapter/create',
    method: 'post',
    data: {
      jwt: jwt,
      name: name,
      content: content,
      subject_id: subject_id
    }
  })
}

export function create_subject(
  jwt, //: string,
  name, //: string,
  content, //: string
) {
  return request({
    url: '/subject/create',
    method: 'post',
    data: {
      jwt: jwt,
      name: name,
      content: content
    }
  })
}

export function get_subject_all_chapters(
  jwt, //: string,
  subject_id //: number
) {
  return request({
    url: '/chapter',
    method: 'post',
    data: {
      jwt: jwt,
      subject_id: subject_id
    }
  })
}
