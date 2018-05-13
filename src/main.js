// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import config from '@/config'
import store from './store/index.js'
import VeeValidate, { Validator } from 'vee-validate'
import en from 'vee-validate/dist/locale/en'

axios.defaults.baseURL = config.api
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

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

const Veeconfig = {
  locale: 'en'
}

const dictionary = {
  en: {
    messages: {
      regex: 'Minimum 6 characters, one capital letter, one number and one special character'
    }
  }
}

Validator.localize({ en: en })

Validator.localize(dictionary)

Vue.use(VeeValidate, Veeconfig)

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
  store,
  Vuetify,
  components: { App },
  template: '<App/>'
})
