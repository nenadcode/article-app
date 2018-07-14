<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent small slot="activator">
      <v-icon medium>edit</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="headline">Edit article</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-form>
              <v-card-text>
                <v-text-field
                  placeholder="Title"
                  name="Title"
                  v-validate="'required: true'"
                  v-model="editedTitle"
                  required></v-text-field>
                  <span
                  v-show="errors.has('Title')"
                  class="errorMessage">{{ errors.first('Title') }}</span>
                  <v-textarea
                  placeholder="Description"
                  name="Description"
                  v-validate="'max:155'"
                  v-model="editedBody"
                  required
                  :counter="155"
                  height="200px"></v-textarea>
                <span
                  v-show="errors.has('Description')"
                  class="errorMessage">{{ errors.first('Description') }}</span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                flat
                class="blue--text darken-1"
                @click="editDialog = false">Close</v-btn>
                <v-btn
                color="primary"
                required
                :disabled="!formIsValid"
                @click="onSaveChanges">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditArticleDetailsDialog',
  props: ['article'],
  data () {
    return {
      editedTitle: '',
      editedBody: '',
      editDialog: false
    }
  },
  mounted () {
    this.editedTitle = this.article.title
    this.editedBody = this.article.body
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'storeError'
    ]),
    formIsValid () {
      return this.editedTitle !== '' &&
      this.editedBody !== ''
    }
  },
  methods: {
    ...mapActions([
      'editArticle',
      'getUser',
      'getAllArticles'
    ]),
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedBody.trim() === '') {
        return
      }
      let data = {
        id: this.article.id,
        posterFirstName: this.article.posterFirstName,
        posterLastName: this.article.posterLastName,
        posterEmail: this.article.posterEmail,
        posterId: this.article.posterId,
        title: this.editedTitle,
        body: this.editedBody,
        datetime: new Date()
      }
      this.$emit('newarticle', data)
    }
  },
  watch: {
    'article' (article) {
      this.editedTitle = this.article.title
      this.editedBody = this.article.body
    }
  }
}
</script>
