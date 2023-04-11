import client from './client'

let api_url_head:string = 'http://localhost:3000'

export function get_issue_detail(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/get', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function cancel_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/cancel', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function classify_issue(
  jwt: string,
  issue_id: number,
  is_valid: number
) {
  return client.POST(api_url_head + '/issue/classify', {
    data: {
      jwt: jwt,
      issue_id: issue_id,
      is_valid: is_valid
    }
  })
}

export function readopt_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/readopt', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function agree_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/agree', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function review_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/review', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function reject_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/reject', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function adopt_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/adopt', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function get_issue_tag(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/tags', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function update_issue_tag(
  jwt: string,
  issue_id: number,
  tag_list: Array<number>
) {
  return client.POST(api_url_head + '/issue/tags_update', {
    data: {
      jwt: jwt,
      issue_id: issue_id,
      tag_list: tag_list
    }
  })
}

export function check_follow_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/follow_check', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function follow_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/follow', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function check_like_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/favorite', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function like_issue(
  jwt: string,
  issue_id: number,
) {
  return client.POST(api_url_head + '/issue/like', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function update_issue_info(
  jwt: string,
  issue_id: number,
  chapter_id: number,
  title: string,
  content: string,
  anonymous: number
) {
  return client.POST(api_url_head + '/issue/update', {
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
  jwt: string,
  chapter_id: number,
  title: string,
  content: string,
  anonymous: number
) {
  return client.POST(api_url_head + '/issue/commit', {
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
  jwt: string,
  keyword: string,
  tag_list: Array<number>,
  status_list: Array<number>,
  chapter_list: Array<number>,
  order: number,
  page_no: number,
  issue_per_page: number
) {
  return client.POST(api_url_head + '/issue', {
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
