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

export function get_tutor_bonus(
  jwt, //: string
  bonus_per_counsel, //: float
  bonus_per_review, //: float
  begin_date, //: string
  end_date, //: string
  min_bonus, //: float
  max_bonus, //: float
) {
  return request({
    url: '/admins/tutor_bonus',
    method: 'post',
    data: {
      jwt: jwt,
      bonus_per_counsel: bonus_per_counsel,
      bonus_per_review: bonus_per_review,
      begin_date: begin_date,
      end_date: end_date,
      min_bonus: min_bonus,
      max_bonus: max_bonus
    }
  })
}

export function get_student_bonus(
  jwt, //: string
  bonus_per_issue, //: float
  begin_date, //: string
  end_date, //: string
  min_bonus, //: float
  max_bonus, //: float
) {
  return request({
    url: '/admins/student_bonus',
    method: 'post',
    data: {
      jwt: jwt,
      bonus_per_issue: bonus_per_issue,
      begin_date: begin_date,
      end_date: end_date,
      min_bonus: min_bonus,
      max_bonus: max_bonus
    }
  })
}
