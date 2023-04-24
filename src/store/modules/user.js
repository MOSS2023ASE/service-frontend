import {user_login, user_logout, getInfo, register, getProfile, get_user_info} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setUserId,
  removeUserId,
  getUserId,
  removeRole,
  setRole, getRole,
} from '@/utils/auth'
import router, {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  user_id: getUserId()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id + ''
  },
}

const actions = {

  //user register
  register({commit}, userInfo) {
    const {user_name, password, password_confirmation} = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      register({
        user_name: user_name.trim(), password: password,
        password_confirmation: password_confirmation
      }).then(response => {
        // const {data} = response
        // commit('SET_TOKEN', data.token)//?
        // commit('SET_USER_ID', data.user_id)
        // setToken(data.token)//?
        // setUserId(data.user_id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login 改名字
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {

      user_login(username.trim(), password).then(response => {
        // store.dispatch('user/resetToken')
        commit('SET_TOKEN', response.data['jwt'])
        // since jwt contains backend userId information, here frontend user_id is student_id
        commit('SET_USER_ID', username.trim())
        commit('SET_ROLES', response.data['role'])
        setToken(response.data['jwt'])
        setUserId(username.trim())
        setRole(response.data['role'])
        console.log(getToken())
        console.log(getRole())
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  forceLogin({commit}, userInfo) {
    const data = {
      user_id: 0,
      user_name: 'admin',
      user_role: 'admin',
      token: 'admin-token',
    }
    commit('SET_TOKEN', data.token)
    commit('SET_USER_ID', data.user_id)
    setToken(data.token)
    setUserId(data.user_id)
  },

  forceGetInfo({commit, state}) {
    const name = 'admin'
    const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    const introduction = 'this is an admin'
    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
    commit('SET_ROLES',  ['admin'])
    console.log("COMMIT ROLE:" + state.roles)
    commit('SET_INTRODUCTION', introduction)
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      let jwt = state.token
      get_user_info(jwt).then(response=>{
        const data = response.data
        console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        let user_id = response.data.user_id
        let student_id = response.data.student_id
        let name = response.data.name
        let mail = response.data.mail
        let avatar = response.data.avatar
        let user_role = response.data.role
        commit('SET_NAME', name)
        let roles = [user_role]
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        console.log("COMMIT ROLE:" + state.roles)
        resolve(data)
      }).catch(error=>{
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      user_logout(state.token).then((response) => {
        console.log(response)
        commit('SET_TOKEN', '')
        commit('SET_USER_ID', 0)
        commit('SET_ROLES', [])
        removeToken()
        removeUserId()
        removeRole()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {root: true})

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_ID', '')
      removeToken()
      removeUserId()
      removeRole()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({commit, dispatch}, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const {roles} = await dispatch('forcegGetInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
