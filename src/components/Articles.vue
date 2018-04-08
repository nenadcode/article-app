<template>
  <div>
    <v-layout row wrap align-center>
      <v-flex xs6 md6 mt-2>
        <div v-for="article in allArticles" :key="article.id">
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
              <v-btn icon class="red--text">
                <v-icon medium>fa-reddit</v-icon>
              </v-btn>
              <v-btn icon class="light-blue--text">
                <v-icon medium>fa-twitter</v-icon>
              </v-btn>
              <v-btn icon class="blue--text text--darken-4">
                <v-icon medium>fa-facebook</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn flat class="blue--text">Read More</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Articles',
  data () {
    return {
      page: 1
    }
  },
  created () {
    this.getAllArticles()
  },
  computed: {
    ...mapGetters([
      'allArticles'
    ])
  },
  methods: {
    ...mapActions([
      'getAllArticles'
    ])
  }
}
</script>

<style scoped>
  .layout.wrap {
    justify-content: center;
  }

  .pagination-wrapper {
    text-align: center;
  }
</style>
