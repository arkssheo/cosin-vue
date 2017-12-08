import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './authStore'
import userStore from './userStore'
import { USER_ADMIN_ROLE_STRING } from '../constants/global'

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
    }
  },
  actions: {
    setProfileDialogVisibility ({commit}, isVisible) {
      // console.log('setting visibility to: ', isVisible)
      commit('setProfileDialogVisibility', isVisible)
    },
    setHtmlToPrint ({commit}, html) {
      commit('setHtmlToPrint', html)
    }
  },
  modules: {
    authStore,
    userStore
  }
})
