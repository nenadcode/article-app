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
      this.$router.push({ name: 'articles' })
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

<style>
 a:hover {
    text-decoration: none;
  }

  .btn.btn--flat.btn--large,
  .btn.btn--flat,
  .btn.primary,
  .btn.accent {
    padding: 0;
  }

  .btn.btn--flat.btn--large {
    margin: 0;
  }

  .btn--large .btn__content {
    padding: 0 16px;
  }

  .toolbar__title {
    margin-left: 0;
  }

  .toolbar__items .btn {
    height: 44px;
    margin: 2px 0;
  }

  .btn .btn__content .icon {
    padding-bottom: 14px;
  }

  .btn .btn__content .icon.icon--left {
    padding-bottom: 2px;
  }

  .btn .icon--left {
    margin-right: 10px;
  }
  .primary {
    border-color: none;
  }
</style>
