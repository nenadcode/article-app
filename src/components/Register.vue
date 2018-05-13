<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="accent">
              <v-toolbar-title>Register</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field class="input-field" v-validate="'required: true'" name="First Name" label="First Name" type="text" v-model="newUser.firstName"></v-text-field>
                <span v-show="errors.has('First Name')" class="errorMessage">{{ errors.first('First Name') }}</span>
                <v-text-field class="input-field" v-validate="'required: true'" name="Last Name" label="Last Name" type="text" v-model="newUser.lastName"></v-text-field>
                <span v-show="errors.has('Last Name')" class="errorMessage">{{ errors.first('Last Name') }}</span>
                <v-text-field class="input-field" v-validate="'required|email'" name="email" label="E-mail" type="text" v-model="newUser.email"></v-text-field>
                <span v-show="errors.has('email')" class="errorMessage">{{ errors.first('email') }}</span>
                <v-text-field class="input-field" v-validate="{ required: true, regex: /(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }" name="Password" label="Password" id="password" type="password" v-model="newUser.pass"></v-text-field>
                <span v-show="errors.has('Password')" class="errorMessage">{{ errors.first('Password') }}</span>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" @click.native="register">Register</v-btn>
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
  methods: {
    register (e) {
      if (this.newUser.firstName === '' || this.newUser.lastName === '' || this.newUser.email === '' || this.newUser.pass === '') {
        this.error = true
        console.log(this.error)
        e.preventDefault()
        return false
      } else if (this.error === false) {
        console.log(this.error)
        console.log(this.newUser.firstName)
        axios
          .post('api/v1/user', this.newUser)
          .then(res => {
            if (this.error) {
              this.$router.push({ name: 'Login' })
            }
          })
          .catch(err => {
            this.error = err
          })
      }
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
