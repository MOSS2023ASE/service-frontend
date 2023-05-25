import request from '@/utils/request'

export function get_all_years(
  jwt, //: string
) {
  return request({
    url: '/year/',
    method: 'get',
    data: {
      jwt: jwt,
    }
  })
}

export function update_year_info(
  jwt, //: string
  year_id, //: number
  content, //: string
) {
  return request({
    url: '/year/update',
    method: 'post',
    data: {
      jwt: jwt,
      year_id: year_id,
      content: content
    }
  })
}

export function create_year(
  jwt, //: string
  content, //: string
) {
  return request({
    url: '/year/create',
    method: 'post',
    data: {
      jwt: jwt,
      content: content
    }
  })
}

export function update_current_year(
  jwt, //: string
  year_id, //: number
) {
  return request({
    url: '/year/update_current',
    method: 'post',
    data: {
      jwt: jwt,
      year_id: year_id,
    }
  })
}
