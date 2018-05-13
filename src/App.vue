<template>
  <div id="app">
    <v-app id="inspire">
      <app-header :token="token"></app-header>
      <router-view @login="onLogin" @check-token="checkToken"></router-view>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Oauth from 'oauth'
import moment from 'moment'

function isTokenExpired (token) {
  if (!token) {
    return true
  }

  const decoded = Oauth(token)
  const now = moment().add(1, 'minute').valueOf() / 1000
  return decoded.exp < now
}

export default {
  name: 'App',
  created () {
    this.token = localStorage['advis-token']
    if (isTokenExpired(this.token)) {
      delete localStorage['advis-token']
      this.$router.push({ name: 'Login' })
    }
  },
  data () {
    return {
      token: ''
    }
  },
  methods: {
    checkToken () {
      this.token = localStorage['advis-token']
    },
    onLogin (token) {
      this.token = token
    }
  },
  computed: {
    year () { return new Date().getUTCFullYear() },
    loggedIn () {
      return !!this.token
    }
  },
  components: {
    appHeader: Header
  }
}
</script>

<style scoped>
</style>
