import request from '@/utils/request'

export function get_statistics(
  jwt, //: string
  type, // : number
  indicator, // : number
  begin_date, // : string
  end_date, // : string
) {
  return request({
    url: '/admins/statistics',
    method: 'post',
    data: {
      jwt: jwt,
      type: type,
      indicator: indicator,
      begin_date: begin_date,
      end_date: end_date
    }
  })
}

export function get_markdown(
  jwt, //: string
  begin_date, // : string
  end_date, // : string
) {
  return request({
    url: '/markdown',
    method: 'post',
    data: {
      jwt: jwt,
      begin_date: begin_date,
      end_date: end_date
    }
  })
}
