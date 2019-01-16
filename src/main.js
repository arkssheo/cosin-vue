// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import axios from 'axios'
import vuelidate from 'vuelidate'

Vue.use(vuelidate)
Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.baseURL = 'https://cosin-webservices.herokuapp.com/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.xsrfCookieName = 'XCSRF-TOKEN'
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
