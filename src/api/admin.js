import request from '@/utils/request'


export function batch_register(
  jwt, //: string,
  name_list, //: Array<string>,
  student_id_list, //: Array<string>,
  password_list //: Array<string>
) {
  return request({
    url: '/admins/create_user_batch',
    method: 'post',
    data: {
      jwt: jwt,
      name_list: name_list,
      student_id_list: student_id_list,
      password_list: password_list
    }
  })
}

export function update_privilege(
  jwt, //: string,
  user_id, //: number,
  user_role, //: number
) {
  return request({
    url: '/admins/update_privilege',
    method: 'post',
    data: {
      jwt: jwt,
      user_id: user_id,
      user_role: user_role
    }
  })
}

export function get_users(
  jwt //: string
) {
  return request({
    url: '/admins/users',
    method: 'post',
    data: {
      jwt: jwt
    }
  })
}

export function freeze_user(
  jwt, //: string,
  user_id, //: number,
  frozen, //: number
) {
  return request({
    url: '/admins/freeze_user',
    method: 'post',
    data: {
      jwt: jwt,
      user_id: user_id,
      frozen: frozen
    }
  })
}

export function delete_issue(
  jwt, //: string,
  issue_id, //: number
) {
  return request({
    url: '/admins/issue/delete',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function single_register(
  jwt, //: string,
  name, //: string,
  student_id, //: string,
  password //: string
) {
  return request({
    url: '/admins/create_user',
    method: 'post',
    data: {
      jwt: jwt,
      name: name,
      student_id: student_id,
      password: password
    }
  })
}
