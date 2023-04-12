import request from '@/utils/request'

export function user_login(
  student_id, //: string,
  password, //: string,
) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      student_id: student_id,
      password: password
    }
  })
}

export function user_logout(
  jwt //: string
) {
  return request({
    url: '/user/user_logout',
    method: 'post',
    data: {
      jwt: jwt
    }
  })
}


export function password_modify(
  jwt, //: string,
  password_old, //: string,
  password_new //: string
) {
  return request({
    url: '/user/password_modify',
    method: 'post',
    data: {
      jwt: jwt,
      password_old: password_old,
      password_new: password_new
    }
  })
}

export function get_user_info(
  jwt //: string
) {
  return request({
    url: '/user/get_user_info',
    method: 'post',
    data: {
      jwt: jwt
    }
  })
}

export function modify_user_info(
  jwt, //: string,
  avatar, //: string,
  mail, //: string
) {
  return request({
    url: '/user/modify_user_info',
    method: 'post',
    data: {
      jwt: jwt,
      avatar: avatar,
      mail: mail
    }
  })
}

export function get_user_subject(
  jwt, //: string,
  tutor_id //: number,
) {
  return request({
    url: '/user/get_user_subject',
    method: 'post',
    data: {
      jwt: jwt,
      tutor_id: tutor_id
    }
  })
}

export function check_user_subject(
  jwt, //: string,
  tutor_id, //: number,
  subject_id //: number
) {
  return request({
    url: '/user/check_user_subject',
    method: 'post',
    data: {
      jwt: jwt,
      tutor_id: tutor_id,
      subject_id: subject_id
    }
  })
}

export function modify_user_subject(
  jwt, //: string,
  tutor_id, //: number,
  subject_id_list //: Array<number>
) {
  return request({
    url: '/user/modify_user_subject',
    method: 'post',
    data: {
      jwt: jwt,
      tutor_id: tutor_id,
      subject_id_list: subject_id_list
    }
  })
}

export function get_review_issue(
  jwt, //: string,
  page_no, //: number,
  issue_per_page //: number
) {
  return request({
    url: '/user/get_review_issue',
    method: 'post',
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}

export function get_adopt_issue(
  jwt, //: string,
  page_no, //: number,
  issue_per_page //: number
) {
  return request({
    url: '/user/get_adopt_issue',
    method: 'post',
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}

export function get_ask_issue(
  jwt, //: string,
  page_no, //: number,
  issue_per_page //: number
) {
  return request({
    url: '/user/get_ask_issue',
    method: 'post',
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}

export function get_follow_issue(
  jwt, //: string,
  page_no,//: number,
  issue_per_page //: number
) {
  return request({
    url: '/user/get_follow_issue',
    method: 'post',
    data: {
      jwt: jwt,
      page_no: page_no,
      issue_per_page: issue_per_page
    }
  })
}
