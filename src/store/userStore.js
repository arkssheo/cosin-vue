import axios from 'axios'
const state = {
  user: null
}

const getters = {
  getUser (state, userId) {
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
          // console.log('user found: ', user)
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
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
