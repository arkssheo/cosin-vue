import axios from 'axios'
import User from '../viewmodels/User'
import Role from '../viewmodels/Role'
// import jwt from 'jsonwebtoken'

const state = {
  userId: null
}
const mutations = {
  authUser (state, userId) {
    state.userId = userId
  },
  clearAuth (state) {
    state.userId = null
  }
}
const actions = {
  login (context, authData) {
    return new Promise((resolve, reject) => {
      console.log('login', axios.defaults.baseURL)
      axios.post(`/login`, {
        email: authData.email,
        password: authData.password
      })
      .then(res => {
        console.log('login success:', res)

        const user = new User(res.data.user.email)
        const role = new Role(res.data.user.role.name, res.data.user.role.is_admin)
        user.role = role

        context.commit('authUser', user.email)

        localStorage.setItem('userId', user.email)
        localStorage.setItem('role', role)

        // context.dispatch('setLogoutTimer', res.data.expiresIn)
        context.dispatch('storeUser', user)
        resolve(user)
      })
      .catch(res => {
        console.log('error!', res.response.data)
        reject(res)
      })
    })
  },

  signup ({commit, dispatch}, userData) {
    return new Promise((resolve, reject) => {
      const user = new User(
        userData.firstName,
        userData.lastName,
        userData.password,
        userData.email,
        userData.role,
        userData.isAdmin
      )
      console.log('AuthStore user:', user)
      axios.post(`/user`, user)
      .then(res => {
        console.log('store successful, login:', user)
        // dispatch('login', {
        //   email: user.email,
        //   password: user.password
        // })
        // .then(res => {
        //   console.log('fetchUser resolved')
        //   resolve(res)
        // }, err => {
        //   console.log('fetchUser error', err)
        //   reject(err)
        // })
      })
      .catch(res => {
        console.log('error!', res.response.data)
        reject(res)
      })
    })
  },

  logout ({commit, dispatch}) {
    commit('clearAuth')
    commit('clearUser')
  },

  setLogoutTimer ({dispatch}, duration) {
    setTimeout(() => dispatch('logout'), duration * 1000)
  },

  tryAutoLogin ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        return reject(new Error('expired session'))
      }
      // var decoded = jwt.verify(userId, 'secretkey')
      // console.log('decoded token: ', decoded)
      // const expirationDate = decoded.exp
      // const now = new Date().getTime() / 1000
      // console.log(now, expirationDate)
      // if (now > expirationDate) {
      //   return reject(new Error('expired token'))
      // }
      // const userId = localStorage.getItem('localId')
      dispatch('fetchUser', userId)
      .then(res => {
        console.log('auto-login successful for user: ', res)
        commit('authUser', userId)
        return resolve()
      }, err => {
        console.error('auto-login failed: ', err)
        reject(new Error(err.message))
      })
    })
  }

}

export default {
  state,
  mutations,
  actions
}
