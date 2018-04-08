// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import config from '@/config'

axios.defaults.baseURL = config.api
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
  let token = localStorage['advis-token']
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, error => {
  Promise.reject(error)
})

axios.interceptors.response.use(r => {
  return r
}, error => {
  if (error.response.status === 401) {
    localStorage['advis-token'] = ''
    router.push({ name: 'Login' })
  } else {
    throw error
  }
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = localStorage['advis-token']
  if (to.meta.auth && !token) {
    next({ name: 'Login' })
  } else if (!to.meta.auth && token) {
    next({ name: 'Article' })
  } else {
    next()
  }
})

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#ff0000',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Vuetify,
  components: { App },
  template: '<App/>'
})
