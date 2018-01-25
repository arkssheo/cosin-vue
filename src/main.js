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
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'XCSRF-TOKEN'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
