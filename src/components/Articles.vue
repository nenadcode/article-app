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
          <!-- <v-card-actions>
            <v-icon @click="commentDialog = !commentDialog" hover>mode_comment</v-icon>
          </v-card-actions> -->
          <template>
            <div v-if="article && article.comment && article.comment.length">
                <v-card-title>
                  <p class="title">Commments</p>
                </v-card-title>
                <v-card-text
                  v-for="comment in article.comment" :key="comment.id">
                  <p>{{ comment.body }}</p>
                  <div class="comment-info">
                    <p>By: {{ comment.posterFirstName }} {{ comment.posterLastName }}</p>
                    <p>E-mail: {{ comment.posterEmail }}</p>
                  </div>
                </v-card-text>
            </div>
            <div v-else>
              <v-card-text>
                <p class="subheding">No Comments for this article</p>
              </v-card-text>
            </div>
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
          :next-link-class="'next-link-item'"
          >
        </paginate>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import { mapActions, mapGetters } from 'vuex'
import editArticleDialog from './EditArticleDialog.vue'

Vue.component('paginate', Paginate)

export default {
  name: 'Articles',
  data () {
    return {
      pagesNumber: 0,
      currentPage: 1,
      filteredArticlesData: null
      /* commentDialog: true */
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
      'getComments',
      'getFilteredArticles',
      'setArticleComments',
      'deleteArticle',
      'editArticle'
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
    onDeleteArticle (id) {
      this.deleteArticle({ id })
        .then(() => {
          this.getAllArticles()
        })
    },
    editedArticle (data) {
      this.editArticle({ editedArticle: data })
        .then((res) => {
          console.log(res)
          // this.getAllArticles()
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  components: {
    appEditArticleDialog: editArticleDialog
  },
  watch: {
    'filteredArticles' (filteredArticles) {
      this.filteredArticlesData = filteredArticles
    }
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

  .comment-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>
