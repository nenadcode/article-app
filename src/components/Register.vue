<template>
  <v-container class="mt-5 pt-5">
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12">
          <v-toolbar dark color="accent">
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field class="input-field" v-validate="'required: true'" name="First Name" label="First Name" type="text" v-model="newUser.firstName"></v-text-field>
              <span v-show="errors.has('First Name')" class="errorMessage">{{ errors.first('First Name') }}</span>
              <v-text-field class="input-field" v-validate="'required: true'" name="Last Name" label="Last Name" type="text" v-model="newUser.lastName"></v-text-field>
              <span v-show="errors.has('Last Name')" class="errorMessage">{{ errors.first('Last Name') }}</span>
              <v-text-field class="input-field" v-validate="'required|email'" name="email" label="E-mail" type="text" v-model="newUser.email"></v-text-field>
              <span v-show="errors.has('email')" class="errorMessage">{{ errors.first('email') }}</span>
              <v-text-field class="input-field" v-validate="{ required: true, regex: /(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }" name="Password" label="Password" id="password" type="password" v-model="newUser.pass"></v-text-field>
              <span id="password-error" v-show="errors.has('Password')" class="errorMessage">{{ errors.first('Password') }}</span>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="accent"
              @click.native="register"
              :disabled="!formIsValid">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      newUser: {
        email: '',
        firstName: '',
        lastName: '',
        pass: ''
      },
      error: false
    }
  },
  computed: {
    formIsValid () {
      return this.newUser.email !== '' &&
        this.newUser.pass !== '' &&
        this.newUser.firstName !== '' &&
        this.newUser.lastName !== ''
    }
  },
  methods: {
    register (e) {
      if (!this.formIsValid) {
        return
      }
      if (this.newUser.firstName === '' || this.newUser.lastName === '' || this.newUser.email === '' || this.newUser.pass === '') {
        this.error = true
        e.preventDefault()
        return false
      } else if (this.error === false) {
        axios
          .post('api/v1/user', this.newUser)
          .then(res => {
            this.$router.push({ name: 'login' })
          })
          .catch(err => {
            this.error = err.data
          })
      }
    },
    onDismissed () {
      console.log('Dismissed Alert')
    }
  }
}
</script>

<style scoped>
  .input-group .input-group__details {
    min-height: 10px;
  }
  .errorMessage {
    color: #ff0000;
  }
</style>
