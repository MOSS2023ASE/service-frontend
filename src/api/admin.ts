import client from './client'

let api_url_head:string = 'http://localhost:3000'

export function batch_register(
  jwt: string,
  name_list: Array<string>,
  student_id_list: Array<string>,
  password_list: Array<string>
) {
  return client.POST(api_url_head + '/admins/create_user_batch', {
    data: {
      jwt: jwt,
      name_list: name_list,
      student_id_list: student_id_list,
      password_list: password_list
    }
  })
}

export function update_privilege(
  jwt: string,
  user_id: number,
  user_role: number
) {
  return client.POST(api_url_head + '/admins/update_privilege', {
    data: {
      jwt: jwt,
      user_id: user_id,
      user_role: user_role
    }
  })
}

export function get_users(
  jwt: string
) {
  return client.POST(api_url_head + '/admins/users', {
    data: {
      jwt: jwt
    }
  })
}

export function freeze_user(
  jwt: string,
  user_id: number,
  frozen: number
) {
  return client.POST(api_url_head + '/admins/freeze_user', {
    data: {
      jwt: jwt,
      user_id: user_id,
      frozen: frozen
    }
  })
}

export function delete_issue(
  jwt: string,
  issue_id: number
) {
  return client.POST(api_url_head + '/admins/issue/delete', {
    data: {
      jwt: jwt,
      issue_id: issue_id
    }
  })
}

export function single_register(
  jwt: string,
  name: string,
  student_id: string,
  password: string

) {
  return client.POST(api_url_head + '/admins/create_user', {
    data: {
      jwt: jwt,
      name: name,
      student_id: student_id,
      password: password
    }
  })
}
