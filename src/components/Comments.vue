<template>
  <div>
    <!-- <v-btn icon class="red--text" @click="showComments">
      <v-icon medium>fa-comment</v-icon>
    </v-btn>

    <div v-if="commentsActive">
      text komentara

      <p v-for="comment in allComments" :key="comment.id">
        {{ comment.body }}
      </p>
    </div>

    <div v-else>
      <p>No Comments</p>
    </div> -->

    <h2>Comments</h2>

    <p v-for="comment in allComments" :key="comment.id">
      {{ comment.body }}
    </p>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Comments',
  props: ['articleId'],
  created () {
    this.getComments({ id: this.articleId })
  },
  data () {
    return {
      commentsActive: false
    }
  },
  computed: {
    ...mapGetters([
      'allComments'
    ])
  },
  methods: {
    ...mapActions([
      'getComments'
    ]),
    showComments () {
      this.commentsActive = !this.commentsActive
    }
  }
}
</script>

<style scoped>

</style>
