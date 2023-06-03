import request from '@/utils/request'

export function send_mail(
  mail, // : string
) {
  return request({
    url: '/mail/send',
    method: 'post',
    data: {
      mail: mail,
    }
  })
}

export function confirm_mail(
  mail, // : string
  student_id, // : string
  password, // : string
  v_code, // : string
) {
  return request({
    url: '/mail/confirm',
    method: 'post',
    data: {
      mail: mail,
      student_id: student_id,
      password: password,
      v_code: v_code
    }
  })
}
