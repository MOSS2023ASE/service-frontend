import {login, logout, getInfo, register, getProfile} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setUserId,
  removeUserId,
  getUserId,
  removeRole,
  setRole,
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

      login({user_name: username.trim(), password: password}).then(response => {
        const {data} = response
        // store.dispatch('user/resetToken')
        commit('SET_TOKEN', data.login_token)
        commit('SET_USER_ID', data.user_id)
        //let roles = [data.user_role]
        //commit('SET_ROLES', roles)
        setToken(data.login_token)
        setUserId(data.user_id)
        resolve()
      }).catch(error => {
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
      getProfile({user_id: state.user_id}).then(response => {
        const {data} = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        let {user_role, user_name, user_pic} = data

        //commit('SET_ROLES', roles)
        let roles = [user_role]
        commit('SET_NAME', user_name)
        if (user_pic === null) {
          user_pic = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        }
        commit('SET_AVATAR', user_pic)
        commit('SET_ROLES', roles)
        console.log("COMMIT ROLE:" + state.roles)
        //commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
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

    const {roles} = await dispatch('getInfo')

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
