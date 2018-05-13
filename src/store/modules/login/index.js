import loginApi from '../../../api/login'
import axios from 'axios'

const state = {
  user: {
    grant_type: 'Bearer',
    email: '',
    password: ''
  }
}

const getters = {
  userLogin: state => state.user
}

const actions = {
  goUserLogin() {
    let querystring = require('querystring')

    axios
      .post('oauth2/token', querystring.stringify(this.user))
      .then(({ data: token }) => {
        localStorage['advis-token'] = token
        this.error = false
        this.$emit('login', { token })
        this.$router.push({ name: 'Article' })
      })
      .catch(err => {
        this.error = err
      })
  }
}