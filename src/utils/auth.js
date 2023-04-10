import Cookies from 'js-cookie'

const TokenKey = 'Token'

const UserIdKey = 'UserId'

const RoleKey = 'Visitor'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(user_id) {
  console.log("user_id is:" + user_id)
  return Cookies.set(UserIdKey, user_id)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}

export function setRole(roles) {
  return Cookies.set(RoleKey, roles)
}
