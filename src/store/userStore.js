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
    axios.post('/users.json', userData)
    .then(res => {
      return res
    })
    .catch(res => console.error(res))
  },

  fetchUser ({commit}, userData) {
    return new Promise((resolve, reject) => {
      axios.get('/users.json')
      .then(res => {
        const data = res.data
        const users = []
        for (let key in data) {
          const user = data[key]
          user.key = key
          users.push(user)
        }
        let user = null
        if (userData.email) {
          user = users.filter(user => {
            return user.email === userData.email
          })[0]
        } else if (userData.localId) {
          user = users.filter(user => {
            return user.id === userData.localId
          })[0]
        }

        if (user) {
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
