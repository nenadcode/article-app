<template>
  <div>
    <v-card-actions>
      <v-icon @click="commentDialog = !commentDialog" hover>mode_comment</v-icon>
    </v-card-actions>
    <div v-if="commentDialog">
      <v-layout class="create-comment">
        <v-flex xs8>
        <v-card-text>
          <v-flex xs12 mx-2>
            <v-text-field
            placeholder="Comment Title"
            name="Title"
            v-validate="'required: true'"
            v-model="newComment.title"
            required></v-text-field>
            <span
              v-show="errors.has('Title')"
              class="errorMessage">{{ errors.first('Title') }}</span>
            <v-textarea
              label="Add a comment..."
              name="Comment"
              v-validate="'max:155'"
              v-model="newComment.body"
              :counter="155"></v-textarea>
            <span
              v-show="errors.has('Comment')"
              class="errorMessage">{{ errors.first('Comment') }}</span>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="primary"
            required
            :disabled="!formIsValid"
            @click="createNewComment(article.id)">
            Add
          </v-btn>
        </v-card-actions>
        </v-flex>
      </v-layout>

      <div v-if="article && article.comment && article.comment.length">
        <div v-for="comment in article.comment" :key="comment.id">
          <v-card-title class="comment-title">
            <h3 class="title">{{ comment.title }}</h3>
            <template>
              <v-btn fab accent small @click="onDeleteComment({ aid: article.id, cid: comment.id })">
                <v-icon medium>delete_forever</v-icon>
              </v-btn>
            </template>
          </v-card-title>
          <v-card-text>
            <p>{{ comment.body }}</p>
            <div class="comment-info">
              <p>By: {{ comment.posterFirstName }} {{ comment.posterLastName }}</p>
              <p>E-mail: {{ comment.posterEmail }}</p>
            </div>
          </v-card-text>
        </div>
      </div>
      <div v-else>
        <v-card-text>
          <p class="subheding">No Comments for this article</p>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Comments',
  props: ['article'],
  data () {
    return {
      newComment: {
        title: '',
        body: ''
      },
      commentDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    formIsValid () {
      return this.newComment.title !== '' &&
        this.newComment.body !== ''
    }
  },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    createNewComment (id) {
      let commentData = {
        id: this.userInfo.id,
        posterFirstName: this.userInfo.firstName,
        posterLastName: this.userInfo.lastName,
        posterEmail: this.userInfo.email,
        posterId: this.userInfo.id,
        article: id,
        title: this.newComment.title,
        body: this.newComment.body,
        datetime: new Date()
      }
      this.$emit('createNewComment', id, commentData)
    },
    onDeleteComment ({ aid, cid }) {
      this.$emit('deleteComment', aid, cid)
    }
  }
}
</script>

<style scoped>
  .comment-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .comment-info p {
    margin-bottom: 0;
  }

  .create-comment {
    justify-content: center;
  }
</style>
