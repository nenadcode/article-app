<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap mb-5 v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center v-if="error">
      <v-flex xs10 sm6 lg4>
        <v-alert
          :value="true"
          type="error">{{ error }}</v-alert>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center>
      <v-flex xs10 sm6 lg4>
        <v-form>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title class="headline">Create new article</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                placeholder="Title"
                name="Title"
                v-validate="'required: true'"
                v-model="newArticle.title"
                required></v-text-field>
              <span
                v-show="errors.has('Title')"
                class="errorMessage">{{ errors.first('Title') }}</span>
              <v-textarea
                placeholder="Description"
                name="Description"
                v-validate="'max:155'"
                v-model="newArticle.body"
                required
                :counter="155"></v-textarea>
              <span
                v-show="errors.has('Description')"
                class="errorMessage">{{ errors.first('Description') }}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                required
                :disabled="!formIsValid"
                @click="createNewArticle">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticlesNewArticle',
  data () {
    return {
      newArticle: {
        body: '',
        title: ''
      },
      error: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'storeError',
      'loading'
    ]),
    formIsValid () {
      return this.newArticle.title !== '' &&
      this.newArticle.body !== ''
    }
  },
  methods: {
    ...mapActions([
      'postArticle',
      'getUser'
    ]),
    createNewArticle () {
      this.postArticle({ article: {
        id: this.userInfo.id,
        posterFirstName: this.userInfo.firstName,
        posterLastName: this.userInfo.lastName,
        posterEmail: this.userInfo.email,
        posterId: 0,
        title: this.newArticle.title,
        body: this.newArticle.body,
        datetime: new Date()
      }})
        .then(article => {
          this.$router.push({ name: 'articles' })
        })
        .catch(err => {
          this.error = err
        })
    }
  }
}
</script>

<style scoped>
  .v-card__title {
    padding-bottom: 0;
  }
  .v-card__text {
    padding-top: 0;
  }

  .v-input.v-textarea {
    margin-top: 0;
  }
</style>
