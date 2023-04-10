import request from '@/utils/request'

const {deepClone} = require('../utils')
const {asyncRoutes, constantRoutes} = require('../../mock/role/routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {title: 'dashboard', icon: 'dashboard'}
        }
      ]
    }]
  }
]

export function getRoutes() {
  return request({
    method: 'get',
    code: 20000,
    data: routes
  })
}

export function getRoles() {
  return request({
    method: 'get',
    code: 20000,
    data: roles
  })
}

export function addRole(data) {
  return request({
    method: 'post',
    data: {
      key: 300
    }
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
