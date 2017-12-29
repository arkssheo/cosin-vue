import axiosAuth from 'axios'
import jwt from 'jsonwebtoken'
import { User } from '../viewmodels/User'

const state = {
  userId: null,
  username: null,
  role: null
}
const mutations = {
  authUser (state, userData) {
    state.localId = userData.localId
    state.idToken = userData.idToken
  },
  clearAuth (state) {
    state.localId = null
    state.idToken = null
  }
}
const actions = {
  login (context, authData) {
    return new Promise((resolve, reject) => {
      axiosAuth.post(`/login/`, {
        email: authData.email,
        password: authData.password
      })
      .then(res => {
        console.log('post success')
        const userId = res.data.userid
        context.commit('authUser', {
          userId: res.data.userid,
          username: res.data.username,
          role: res.data.role
        })
        // const now = new Date()
        // const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

        localStorage.setItem('userId', res.data.userid)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('role', res.data.role)
        // localStorage.setItem('expirationDate', expirationDate)

        // context.dispatch('setLogoutTimer', res.data.expiresIn)
        context.dispatch('fetchUser', userId)
        .then(res => {
          console.log('fetchUser resolved')
          resolve(res)
        }, err => {
          console.log('fetchUser error', err)
          reject(err)
        })
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
      axiosAuth.post(`/user`, user)
      .then(res => {
        console.log('store successful, login:', user)
        // dispatch('login', {
        //   email: user.email,
        //   password: user.password
        // })
        // .then(res => {
        //   resolve(res)
        // }, err => {
        //   reject(err)
        // })
        resolve(user)
      })
      .catch(res => {
        console.error(res)
        reject(new Error(res.message))
      })
    })
  },

  logout ({commit}) {
    commit('clearAuth')
    commit('clearUser')
    localStorage.removeItem('localId')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expirationDate')
  },

  setLogoutTimer ({dispatch}, duration) {
    setTimeout(() => dispatch('logout'), duration * 1000)
  },

  tryAutoLogin ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('idToken')
      if (!token) {
        return reject(new Error('expired token'))
      }
      var decoded = jwt.verify(token, 'secretkey')
      // console.log('decoded token: ', decoded)
      const expirationDate = decoded.exp
      const now = new Date().getTime() / 1000
      console.log(now, expirationDate)
      if (now > expirationDate) {
        return reject(new Error('expired token'))
      }
      const userId = localStorage.getItem('localId')
      dispatch('fetchUser', userId)
      .then(res => {
        // console.log('auto-login successful for user: ', res.email)
        commit('authUser', {
          localId: userId,
          idToken: token
        })
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
