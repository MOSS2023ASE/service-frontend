import axios from 'axios'
// @ts-ignore
import qs from 'qs'


function DELETE(url: string, options?: any) {
    if (options?.data &&
        options.headers?.['Content-Type'] !== 'multipart/form-data')
        options.data = qs.stringify(options.data, { arrayFormat: 'brackets' })
    return axios({ method: 'DELETE', url, ...options })
}

function GET(url: string, options?: any) {
    if (options?.data &&
        options.headers?.['Content-Type'] !== 'multipart/form-data')
        options.data = qs.stringify(options.data, { arrayFormat: 'brackets' })
    return axios({ method: 'GET', url, ...options })
}

function POST(url: string, options?: any) {
    if (options?.data &&
        options.headers?.['Content-Type'] !== 'multipart/form-data')
        options.data = qs.stringify(options.data, { arrayFormat: 'brackets' })
    return axios({ method: 'POST', url, ...options })
}

function PUT(url: string, options?: any) {
    if (options?.data)
        options.data = qs.stringify(options.data, { arrayFormat: 'brackets' })
    return axios({ method: 'PUT', url, ...options })
}

const API = axios.create({
    baseURL:'http://localhost:3000', //请求后端数据的基本地址，自定义
    timeout: 2000                   //请求超时设置，单位ms
})

export default { DELETE, GET, POST, PUT, API }
