<template>
  <v-layout row wrap mt-5 pt-5 v-if="loading">
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular
        indeterminate
        class="primary--text"
        :width="7"
        :size="70"></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout row wrap align-center mt-5 pt-5 v-else>
    <v-flex xs6 md6>
      <div v-for="article in filteredArticlesData" :key="article.id">
        <v-card class="my-5">
          <v-card-title class="article-title">
            <h2 class="headline">{{ article.title }}</h2>
            <template v-if="userInfo !== null && article.posterId === userInfo.id">
              <v-spacer></v-spacer>
              <app-edit-article-dialog
                :article="article"
                @newarticle="editedArticle"
              />
              <v-btn fab accent small @click="onDeleteArticle(article.id)">
                <v-icon medium>delete_forever</v-icon>
              </v-btn>
            </template>
          </v-card-title>
          <v-card-text>
            <p class="subheading">{{ article.body }}</p>
          </v-card-text>
          <template>
            <app-comments
              :article="article"
              @createNewComment="createNewCommentChild"
              @deleteComment="deleteCommentChild"></app-comments>
          </template>
        </v-card>
      </div>
      <div class="paginate-wrapper">
        <paginate
          :page-count="pagination.totalPages"
          :click-handler="getArticlesData"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination container-class'"
          :page-class="'page-item'"
          :page-link-class="'page-link-item'"
          :prev-class="'prev-item'"
          :prev-link-class="'prev-link-item'"
          :next-class="'next-item'"
          :next-link-class="'next-link-item'"></paginate>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import { mapActions, mapGetters } from 'vuex'
import editArticleDialog from './EditArticleDialog.vue'
import Comments from './Comments.vue'

Vue.component('paginate', Paginate)

export default {
  name: 'Articles',
  data () {
    return {
      pagesNumber: 0,
      currentPage: 1,
      filteredArticlesData: null
    }
  },
  created () {
    this.getAllArticles()
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'filteredArticles',
      'allComments',
      'pagination',
      'loading'
    ]),
    loggedIn () {
      return !!this.token
    }
  },
  methods: {
    ...mapActions([
      'getUser',
      'getAllArticles',
      'getFilteredArticles',
      'editArticle',
      'deleteArticle',
      'setArticleComments',
      'getComments',
      'postComment',
      'deleteComment'
    ]),
    setArticles (res) {
      const self = this
      let userArticles = res.data
      self.pagesNumber = res.meta.pagination.total_pages
      self.articles = userArticles
    },
    getArticlesData (page) {
      if (page) {
        this.currentPage = page
      }
      this.getFilteredArticles(page)
    },
    editedArticle (data) {
      this.editArticle({ editedArticle: data })
        .then((res) => {
        })
        .catch(err => {
          this.error = err
        })
    },
    onDeleteArticle (id) {
      this.deleteArticle({ id })
        .then(() => {
          this.getAllArticles()
        })
    },
    createNewCommentChild (id, commentData) {
      this.postComment({ id, commentData })
        .then(() => {
          this.getAllArticles()
        })
        .catch(err => {
          this.error = err
        })
    },
    deleteCommentChild (aid, cid) {
      this.deleteComment({ aid, cid })
        .then(() => {
          console.log('Liverpool')
        })
    }
  },
  watch: {
    'filteredArticles' (filteredArticles) {
      this.filteredArticlesData = filteredArticles
    }
  },
  components: {
    appEditArticleDialog: editArticleDialog,
    appComments: Comments
  }
}
</script>

<style scoped>
  .layout.wrap {
    justify-content: center;
  }

  .paginate-wrapper {
    text-align: center;
    margin-bottom: 20px;
  }

  .article-title {
    justify-content: center;
  }
</style>
