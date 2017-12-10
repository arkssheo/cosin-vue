import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './authStore'
import userStore from './userStore'
import { USER_ADMIN_ROLE_STRING } from '../constants/global'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    profileDialogVisible: false,
    roles: [
      { id: 1, value: 'Usuario' },
      { id: 2, value: USER_ADMIN_ROLE_STRING },
      { id: 3, value: 'Revisor' }
    ],
    htmlToPrint: null
  },
  getters: {
    getRoles (state) {
      return state.roles
    },
    isProfileDialogVisible (state) {
      return state.profileDialogVisible
    },
    getHtmlToPrint (state) {
      return state.htmlToPrint
    }
  },
  mutations: {
    setProfileDialogVisibility (state, isVisible) {
      state.profileDialogVisible = isVisible
    },
    setHtmlToPrint (state, html) {
      state.htmlToPrint = html
    },
    setRoles (state, roles) {
      state.roles = roles
    }
  },
  actions: {
    setProfileDialogVisibility ({commit}, isVisible) {
      // console.log('setting visibility to: ', isVisible)
      commit('setProfileDialogVisibility', isVisible)
    },
    setHtmlToPrint ({commit}, html) {
      commit('setHtmlToPrint', html)
    },
    fetchRoles ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/roles')
        .then(res => {
          commit('setRoles', res.data.roles)
          resolve(res.data.roles)
        }, err => {
          console.error(err)
          reject(err)
        })
      })
    }
  },
  modules: {
    authStore,
    userStore
  }
})
