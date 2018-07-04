<template>
  <div>
    <v-layout row wrap v-if="loading">
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
        <div class="paginate-wrapper" mt-5>
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
        <div v-for="article in filteredArticles" :key="article.id">
          <v-card class="my-5">
            <v-card-title class="article-title">
              <h2 class="headline">{{ article.title }}</h2>
            </v-card-title>
            <v-card-text>
              <p class="subheading">{{ article.body }}</p>
            </v-card-text>
            <!-- <v-card-actions>
              <v-icon @click="commentDialog = !commentDialog" hover>mode_comment</v-icon>
            </v-card-actions> -->
            <template>
              <div v-if="article && article.comments && article.comments.data && article.comments.data.length">
                  <v-card-title>
                    <p class="title">Commments</p>
                  </v-card-title>
                  <v-card-text
                    v-for="comment in article.comments.data" :key="comment.id">
                    <p>{{ comment.body }}</p>
                    <div class="comment-info">
                      <p>Name: {{ comment.posterFirstName }} {{ comment.posterLastName }}</p>
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
  </div>
</template>

<script>
import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import { mapActions, mapGetters } from 'vuex'

Vue.component('paginate', Paginate)

export default {
  name: 'Articles',
  data () {
    return {
      articles: [],
      pagesNumber: 0,
      currentPage: 1
      /* commentDialog: true */
    }
  },
  created () {
    this.getAllArticles()
  },
  computed: {
    ...mapGetters([
      'filteredArticles',
      'allComments',
      'pagination',
      'loading'
    ])
  },
  mounted () {
    this.getArticlesData(1)
  },
  methods: {
    ...mapActions([
      'getAllArticles',
      'getComments',
      'getFilteredArticles',
      'setArticleComments'
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
