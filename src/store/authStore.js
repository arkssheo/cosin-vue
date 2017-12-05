import axiosAuth from '../http/axios-auth'
import { API_KEY } from '../constants/global'

const state = {
  localId: null,
  idToken: null
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
      axiosAuth.post(`verifyPassword?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        // console.log('post success')
        context.commit('authUser', {
          localId: res.data.localId,
          idToken: res.data.idToken
        })
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

        localStorage.setItem('localId', res.data.localId)
        localStorage.setItem('idToken', res.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)

        context.dispatch('setLogoutTimer', res.data.expiresIn)
        context.dispatch('fetchUser', { email: authData.email })
        .then(res => {
          // console.log('fetchUser resolved')
          resolve(res)
        }, err => {
          // console.log('fetchUser error', err)
          reject(err)
        })
      })
      .catch(res => {
        console.log(res)
        reject(res)
      })
    })
  },

  signup ({commit, dispatch}, userData) {
    return new Promise((resolve, reject) => {
      axiosAuth.post(`/signupNewUser?key=${API_KEY}`, {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      })
      .then(res => {
        // commit('authUser', {
        //   localId: res.data.localId,
        //   idToken: res.data.idToken
        // })
        // save into local storage
        // const now = new Date()
        // const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        // localStorage.setItem('localId', res.data.localId)
        // localStorage.setItem('idToken', res.data.idToken)
        // localStorage.setItem('expirationDate', expirationDate)

        // userData.id = res.data.localId
        // dispatch('storeUser', userData)
        // dispatch('setLogoutTimer', res.data.expiresIn)
        resolve(res)
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
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now > expirationDate) {
        return reject(new Error('expired token'))
      }
      const userId = localStorage.getItem('localId')
      dispatch('fetchUser', { localId: userId })
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
