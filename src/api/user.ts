import client from './client'

let api_url_head:string = 'http://localhost:3000'

export function user_login(
  student_id: string,
  password: string,
) {
  return client.POST(api_url_head + '/user/login', {
    data: {
      student_id: student_id,
      password: password
    }
  })
}

export function user_logout(
  jwt: string
) {
  return client.POST(api_url_head + '/user/user_logout', {
    data: {
      jwt: jwt
    }
  })
}


export function password_modify(
  jwt: string,
  password_old: string,
  password_new: string
) {
  return client.POST(api_url_head + '/user/password_modify', {
    data: {
      jwt: jwt,
      password_old: password_old,
      password_new: password_new
    }
  })
}

export function get_user_info(
  jwt: string
) {
  return client.POST(api_url_head + '/user/get_user_info', {
    data: {
      jwt: jwt
    }
  })
}

export function modify_user_info(
  jwt: string,
  avatar: string,
  mail: string
) {
  return client.POST(api_url_head + '/user/modify_user_info', {
    data: {
      jwt: jwt,
      avatar: avatar,
      mail: mail
    }
  })
}

export function get_user_subject(
  jwt: string,
  tutor_id: number,
) {
  return client.POST(api_url_head + '/user/get_user_subject', {
    data: {
      jwt: jwt,
      tutor_id: tutor_id
    }
  })
}

export function check_user_subject(
  jwt: string,
  tutor_id: number,
  subject_id: number
) {
  return client.POST(api_url_head + '/user/check_user_subject', {
    data: {
      jwt: jwt,
      tutor_id: tutor_id,
      subject_id: subject_id
    }
  })
}

export function modify_user_subject(
  jwt: string,
  tutor_id: number,
  subject_id_list: Array<number>
) {
  return client.POST(api_url_head + '/user/modify_user_subject', {
    data: {
      jwt: jwt,
      tutor_id: tutor_id,
      subject_id_list: subject_id_list
    }
  })
}

export function get_review_issue(
  jwt: string,
  page_no: number,
  issue_per_page: number
) {
  return client.POST(api_url_head + '/user/get_review_issue', {
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}

export function get_adopt_issue(
  jwt: string,
  page_no: number,
  issue_per_page: number
) {
  return client.POST(api_url_head + '/user/get_adopt_issue', {
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}

export function get_ask_issue(
  jwt: string,
  page_no: number,
  issue_per_page: number
) {
  return client.POST(api_url_head + '/user/get_ask_issue', {
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}

export function get_follow_issue(
  jwt: string,
  page_no: number,
  issue_per_page: number
) {
  return client.POST(api_url_head + '/user/get_follow_issue', {
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}
