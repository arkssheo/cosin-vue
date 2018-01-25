import axios from 'axios'
import { User } from '../viewmodels/User'

const state = {
  user: null
}

const getters = {
  getUser (state) {
    return state.user
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },

  clearUser (state) {
    state.user = null
  }
}

const actions = {

  storeUser ({commit}, userData) {
    commit('setUser', userData)
  },

  fetchUser ({commit}, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/user/${userId}`)
      .then(res => {
        console.log('got res: ', res)
        const user = res.data.user
        if (res) {
          const user = {
            userId: userId,
            email: res.data.email,
            role: res.data.role
          }
          console.log('user found: ', user)
          commit('setUser', user)
          resolve(user)
        } else {
          reject(new Error('User not found'))
        }
      })
      .catch(res => {
        console.error(res)
        reject(res)
      })
    })
  },

  createUser ({commit}, userData) {
    return new Promise((resolve, reject) => {
      const user = new User(
        userData.firstName,
        userData.lastName,
        userData.password,
        userData.email,
        userData.role
      )
      console.log('new user to be created:', user)
      axios.post(`/create_user/`, user)
      .then(res => {
        console.log('create successful')
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
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
