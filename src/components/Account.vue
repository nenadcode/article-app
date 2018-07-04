<template>
  <div>
    <v-container fluid fill-height>
      <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center v-else>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Account</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form>
                <v-text-field class="input-field" v-validate="'required: true'" name="First Name" label="First Name" type="text" v-model="firstName" @input="inputUserName"></v-text-field>
                <span v-show="errors.has('First Name')" class="errorMessage">{{ errors.first('First Name') }}</span>

                <v-text-field class="input-field" v-validate="'required: true'" name="Last Name" label="Last Name" type="text" v-model="lastName"></v-text-field>
                <span v-show="errors.has('Last Name')" class="errorMessage">{{ errors.first('Last Name') }}</span>

                <v-text-field class="input-field" v-validate="'required: true'" name="Email" label="Email" type="text" v-model="email"></v-text-field>
                <span v-show="errors.has('email')" class="errorMessage">{{ errors.first('email') }}</span>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
// import Vue from 'vue'

export default {
  name: 'Account',
  created () {
    this.getUser()
  },
  data () {
    return {
      id: this.userInfo.id,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      email: this.userInfo.email,
      errorMessage: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    ...mapActions([
      'getUser',
      'changeUserAccount',
      'editUserAccount'
    ]),
    setErrorMessage (message) {
      this.errorMessage = message
    },
    inputUserName (firstName) {
      this.changeUserAccount('firstName', firstName)
    }, /*
    inputUserLastName (lastName) {
      this.changeUserAccount('lastName', lastName)
    },
    inputUserEmail (email) {
      this.changeUserAccount('email', email)
    }, */
    changeUserAccount (property, value) {
      return { property, value }
    }
    /* editUser () {
      const editedUser = this.userEdit
      this.editUserAccount({ userEdit })
        .then(() => Vue.router.push({
          name: 'articles'
        }))
        .catch(err => {
          this.setErrorMessage(err)
        })
    } */
    /* editUser () {
      const editedUser = this.userInfo
      this.editUserAccount({ editedUser })
        .then(() => Vue.router.push({
          name: 'articles'
        }))
        .catch(err => {
          this.setErrorMessage(err)
        })
    } */
  }
}
</script>
