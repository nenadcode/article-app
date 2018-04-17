<template>
  <div>
    <v-layout row wrap align-center>
      <v-flex xs6 md6 mt-2>
        <div v-for="article in filteredArticles" :key="article.id">
          <v-card class="my-5" hover>
            <v-container fill-height fluid>
              <v-layout>
                <v-flex xs12 align-end d-flex>
                  <span class="headline">{{ article.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-text>
              {{ article.body }}
            </v-card-text>
            <v-card-actions>
              <app-comments :articleId="article.id"></app-comments>
            </v-card-actions>
          </v-card>
        </div>
        <div class="paginate-wrapper">
          <paginate
            :page-count="14"
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
import Comments from './Comments.vue'
import { mapActions, mapGetters } from 'vuex'

Vue.component('paginate', Paginate)

export default {
  name: 'Articles',
  data () {
    return {
      articleId: this.$route.params.id,
      articles: [],
      pagesNumber: 0,
      currentPage: 1
    }
  },
  created () {
    this.getAllArticles()
  },
  computed: {
    ...mapGetters([
      'filteredArticles'
    ])
  },
  mounted () {
    this.getArticlesData(1)
  },
  methods: {
    ...mapActions([
      'getAllArticles',
      'getAllComments',
      'getFilteredArticles'
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
  },
  components: {
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
</style>
