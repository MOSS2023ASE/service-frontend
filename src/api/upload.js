import request from '@/utils/request'


export function upload_public(
  formData
) {
  return request({
    url: '/images/upload/',
    method: 'post',
    data: formData,
  })
}


