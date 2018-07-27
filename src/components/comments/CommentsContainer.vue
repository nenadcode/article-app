<template>
  <div>
    <v-card-actions>
      <v-icon @click="commentDialog = !commentDialog" hover>mode_comment</v-icon>
    </v-card-actions>
    <div v-if="commentDialog">
      <v-layout class="create-comment" v-if="userInfo !== null">
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
        <div v-for="(comment, index) in article.comment" :key="index">
          <v-card-title class="comment-title">
            <h3 class="title">{{ comment.title }}</h3>
            <template v-if="userInfo !== null && comment.posterId === userInfo.id">
            <v-spacer></v-spacer>
              <app-comments-edit-dialog
                :article="article"
                :comment="comment"
                @new-comment="editedComment"
              />
              <v-btn fab accent small @click="onDeleteComment({ aid: article.id, cid: comment.id }, index)">
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
import CommentsEditDialog from './CommentsEditDialog.vue'

export default {
  name: 'ArticlesComments',
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
      'getUser',
      'editComment',
      'deleteComment'
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
      this.$emit('create-new-comment', id, commentData)
    },
    editedComment (data, id) {
      this.$emit('edit-comment', data, id)
    },
    onDeleteComment ({ aid, cid }, index) {
      this.deleteComment({ aid, cid })
      this.article.comment.splice(index, 1)
      this.commentDialog = true
    }
  },
  components: {
    appCommentsEditDialog: CommentsEditDialog
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
