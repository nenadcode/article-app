<template>
  <div v-if="userInfo">
    <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Account</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field class="input-field" v-validate="'required: true'" name="First Name" label="First Name" type="text" :value="userInfo.firstName" @input="inputUserName"></v-text-field>
                <span v-show="errors.has('First Name')" class="errorMessage">{{ errors.first('First Name') }}</span>

                <v-text-field class="input-field" v-validate="'required: true'" name="Last Name" label="Last Name" type="text" :value="userInfo.lastName"></v-text-field>
                <span v-show="errors.has('Last Name')" class="errorMessage">{{ errors.first('Last Name') }}</span>

                <v-text-field class="input-field" v-validate="'required: true'" name="Email" label="Email" type="text" :value="userInfo.email"></v-text-field>
                <span v-show="errors.has('email')" class="errorMessage">{{ errors.first('email') }}</span>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
      userEdit: {
        id: '',
        firstName: '',
        lastName: '',
        email: ''
      },
      errorMessage: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
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
  },
  watch: {
    userInfo: function (userInfo) {
      if (!this.userEdit.id && userInfo.id) {
        this.userEdit.id = userInfo.id
      }
      if (!this.userEdit.firstName && userInfo.firstName) {
        this.userEdit.firstName = userInfo.firstName
      }
      if (!this.userEdit.lastName && userInfo.lastName) {
        this.userEdit.lastName = userInfo.lastName
      }
      if (!this.userEdit.email && userInfo.email) {
        this.userEdit.email = userInfo.email
      }
    }
  }
}
</script>
