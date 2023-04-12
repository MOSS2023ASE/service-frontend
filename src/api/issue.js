import request from '@/utils/request'

export function get_issue_detail(
  jwt,
  issue_id
) {
  return request({
    url: '/issue/get',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function cancel_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/cancel',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function classify_issue(
  jwt,
  issue_id,
  is_valid
) {
  return request({
    url: '/issue/classify',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
      is_valid: is_valid
    }
  })
}

export function readopt_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/readopt',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function agree_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/agree',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function review_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/review',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function reject_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/reject',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function adopt_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/adopt',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function get_issue_tag(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/tags',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function update_issue_tag(
  jwt,
  issue_id,
  tag_id_list
) {
  return request({
    url: '/issue/tags_update',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
      tag_list: tag_id_list
    }
  })
}

export function check_follow_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/follow_check',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function follow_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/follow',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function check_like_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/favorite',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function like_issue(
  jwt,
  issue_id,
) {
  return request({
    url: '/issue/like',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function update_issue_info(
  jwt, //  string,
  issue_id, //: number,
  chapter_id, //: number,
  title, //: string,
  content, //: string,
  anonymous, //: number
) {
  return request({
    url: '/issue/update',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
      chapter_id: chapter_id,
      title: title,
      content: content,
      anonymous: anonymous
    }
  })
}

export function commit_issue(
  jwt, //: string,
  chapter_id, //: number,
  title, //: string,
  content, //: string,
  anonymous, //: number
) {
  return request({
    url: '/issue/commit',
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

export function search_issue(
  jwt, //: string,
  keyword, //: string,
  tag_list, //: Array<number>,
  status_list, //: Array<number>,
  chapter_list, //: Array<number>,
  order, //: number,
  page_no, //: number,
  issue_per_page, //: number
) {
  return request({
    url: '/issue',
    method: 'post',
    data: {
      jwt: jwt,
      keyword: keyword,
      tag_list: tag_list,
      status_list: status_list,
      chapter_list: chapter_list,
      order: order,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}
