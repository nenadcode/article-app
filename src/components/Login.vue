<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="email" name="login" label="Email" type="text" v-model="user.email"></v-text-field>
                <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="user.password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.native="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        grant_type: 'Bearer',
        email: '',
        password: ''
      },
      error: false
    }
  },
  created () {
    this.token = localStorage['advis-token']
    this.$emit('check-token', this.token)
    this.articles()
  },
  methods: {
    articles () {
      axios.get('api/v1/article')
        .then(res => {
          console.log(res)
        })
    },
    login () {
      axios
        .post('oauth2/token', this.user, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(({ data: { token } }) => {
          localStorage['advis-token'] = token
          this.error = false
          this.$emit('login', { token })
          this.$router.push({ name: 'Article' })
        })
        .catch(err => {
          this.error = err
        })

        /*
        headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        */
    }
  }
}
</script>
