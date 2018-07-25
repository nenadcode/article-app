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
    <v-flex xs10 sm6 lg4>
      <div v-for="(article, index) in filteredArticlesData" :key="index">
        <v-card class="my-5">
          <v-card-title class="article-title">
            <h2 class="headline">{{ article.title }}</h2>
            <template v-if="userInfo !== null && article.posterId === userInfo.id">
              <v-spacer></v-spacer>
              <app-articles-edit-dialog
                :article="article"
                @new-article="editedArticle"
              />
              <v-btn fab accent small @click="onDeleteArticle(article.id, index)">
                <v-icon medium>delete_forever</v-icon>
              </v-btn>
            </template>
          </v-card-title>
          <v-card-text>
            <p class="subheading">{{ article.body }}</p>
          </v-card-text>
          <template>
            <app-articles-comments
              :article="article"
              @create-new-comment="createNewCommentChild"
              @edit-comment="editCommentChild"
            />
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
import ArticlesEditDialog from './ArticlesEditDialog.vue'
import ArticlesComments from './ArticlesComments.vue'

Vue.component('paginate', Paginate)

export default {
  name: 'ArticlesContainer',
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
      'editComment'
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
        .catch(err => {
          this.error = err
        })
    },
    onDeleteArticle (id, index) {
      this.deleteArticle({ id })
      this.filteredArticlesData.splice(index, 1)
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
    editCommentChild (data, id) {
      this.editComment({ id, editedComment: data })
        .then(() => {
          this.getAllArticles()
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  watch: {
    'filteredArticles' (filteredArticles) {
      this.filteredArticlesData = filteredArticles
    }
  },
  components: {
    appArticlesEditDialog: ArticlesEditDialog,
    appArticlesComments: ArticlesComments
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
