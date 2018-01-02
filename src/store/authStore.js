import axios from 'axios'
// import jwt from 'jsonwebtoken'

const state = {
  userId: null
}
const mutations = {
  authUser (state, user) {
    state.userId = user.userId
  },
  clearAuth (state) {
    state.userId = null
  }
}
const actions = {
  login (context, authData) {
    return new Promise((resolve, reject) => {
      axios.post(`/login/`, {
        email: authData.email,
        password: authData.password
      })
      .then(res => {
        console.log('post success')
        const user = {
          userId: res.data.id,
          email: res.data.email,
          role: res.data.role
        }
        context.commit('authUser', user)
        // const now = new Date()
        // const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

        // localStorage.setItem('userId', user.userid)
        // localStorage.setItem('email', user.email)
        // localStorage.setItem('role', user.role)
        // localStorage.setItem('userId', user.userId)
        // localStorage.setItem('expirationDate', expirationDate)

        // context.dispatch('setLogoutTimer', res.data.expiresIn)
        context.dispatch('storeUser', user)
        // console.log(res)
        resolve(res)
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
    dispatch('clearUser')
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
