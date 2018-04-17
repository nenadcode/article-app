<template>
  <div>
    <v-btn icon class="red--text" @click="showComments">
      <v-icon medium>fa-comment</v-icon>
    </v-btn>

    <div v-if="commentsActive">
      <p v-for="comment in allComments" :key="comment.id">
        {{ comment.body }}
      </p>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Comments',
  props: ['articleId'],
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
      'getAllComments'
    ]),
    showComments () {
      this.commentsActive = !this.commentsActive
      this.getAllComments({ id: this.articleId })
    }
  }
}
</script>

<style scoped>

</style>
