import request from '@/utils/request'

export function add_association(
  jwt, //: string
  issue_id, // : number
  issue_associate_id, // : number
) {
  return request({
    url: '/issue/associate',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
      issue_associate_id: issue_associate_id
    }
  })
}

export function delete_association(
  jwt, //: string
  issue_id, // : number
  issue_associate_id, // : number
) {
  return request({
    url: '/issue/associate/delete',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
      issue_associate_id: issue_associate_id
    }
  })
}

export function get_association(
  jwt, //: string
  issue_id, // : number
) {
  return request({
    url: '/issue/associate/get',
    method: 'post',
    data: {
      jwt: jwt,
      issue_id: issue_id,
    }
  })
}
