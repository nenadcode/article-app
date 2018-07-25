<template>
  <v-container fluid fill-height>
    <v-layout row wrap mt-5 pt-5 v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center v-else>
      <v-flex xs10 sm6 md5 lg4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Account Details</v-toolbar-title>
            <template>
              <v-spacer></v-spacer>
              <app-account-edit-dialog
                :userInfo="userInfo"
                @changeAccountInfo="changeAccountInfoChild"
                @save-edited-account="saveEditedAccountChild"
              />
            </template>
          </v-toolbar>
          <v-card-text>
            <v-card-text v-if="userInfo">
              <p>First Name: {{ userInfo.firstName }}</p>
              <p>Last Name: {{ userInfo.lastName }}</p>
              <p>E-mail: {{ userInfo.email }}</p>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import AccountEditDialog from './AccountEditDialog.vue'

export default {
  name: 'AccountContainer',
  data () {
    return {
      errorMessage: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'loading'
    ])
  },
  methods: {
    ...mapActions([
      'getUser',
      'changeAccountInfo',
      'editUserAccount'
    ]),
    changeAccountInfoChild (changed) {
      this.changeAccountInfo(changed)
    },
    saveEditedAccountChild () {
      this.editUserAccount()
        .then(() => {
          this.getUser()
        })
    }
  },
  components: {
    appAccountEditDialog: AccountEditDialog
  }
}
</script>

<style>

</style>
