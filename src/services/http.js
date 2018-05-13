'use strict'

import Vue from 'vue'
import axios from 'axios'
import config from '../config'

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

// export const http = axios
