<template>
  <v-dialog width="350px" persistent v-model="editAccountDialog">
    <v-btn fab accent small slot="activator">
      <v-icon medium>edit</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="headline">Edit Account</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-form v-if="userInfo">
              <v-card-text>
                <v-text-field
                  name="First Name"
                  v-validate="'required: true'"
                  label="First Name"
                  :value="userInfo.firstName"
                  @input="onChangeFirstName"
                  required></v-text-field>
                  <span
                  v-show="errors.has('First Name')"
                  class="errorMessage">{{ errors.first('First Name') }}</span>

                  <v-text-field
                  name="Last Name"
                  v-validate="'required: true'"
                  label="Last Name"
                  :value="userInfo.lastName"
                  @input="onChangeLastName"
                  required></v-text-field>
                <span
                  v-show="errors.has('Last Name')"
                  class="errorMessage">{{ errors.first('Last Name') }}</span>

                <v-text-field
                  name="E-Mail"
                  v-validate="'required: true'"
                  label="E-Mail"
                  :value="userInfo.email"
                  @input="onChangeEmail"
                  required></v-text-field>
                <span
                  v-show="errors.has('E-Mail')"
                  class="errorMessage">{{ errors.first('E-Mail') }}</span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                flat
                class="blue--text darken-1"
                @click="editAccountDialog = false">Close</v-btn>
                <v-btn
                color="primary"
                required
                :disabled="!formIsValid"
                @click="saveAccountInfo">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditAccountDialog',
  props: ['userInfo'],
  data () {
    return {
      editAccountDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'storeError'
    ]),
    formIsValid () {
      return this.editedEmail !== '' &&
      this.editedFirstName !== '' &&
      this.editedLastName !== ''
    }
  },
  methods: {
    onChangeFirstName (firstName) {
      this.changeAccountInfo('firstName', firstName)
    },
    onChangeLastName (lastName) {
      this.changeAccountInfo('lastName', lastName)
    },
    onChangeEmail (email) {
      this.changeAccountInfo('email', email)
    },
    changeAccountInfo (property, value) {
      this.$emit('changeAccountInfo', { property, value })
    },
    saveAccountInfo () {
      /* if (this.editedTitle.trim() === '' || this.editedBody.trim() === '') {
        return
      } */
      this.$emit('save-edited-account')
    }
  }
}
</script>
