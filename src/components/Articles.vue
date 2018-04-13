<template>
  <div>
    <v-layout row wrap align-center>
      <v-flex xs6 md6 mt-2>
        <v-data-table
          :items="allArticles"
          :pagination.sync="pagination"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="articles">
            <v-card class="my-5" hover>
              <v-container fill-height fluid>
                <v-layout>
                  <v-flex xs12 align-end d-flex>
                    <span class="headline">{{ articles.item.title }}</span>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-text>
                {{ articles.item.body }}
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
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
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
      pagination: {}
    }
  },
  created () {
    this.getAllArticles()
  },
  computed: {
    ...mapGetters([
      'allArticles'
    ]),
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.allArticles.length / this.pagination.rowsPerPage) : 0
    }
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

  .application .theme--light.table,
  .theme--light .table {
    background-color: transparent !important;
  }

  .pagination-wrapper {
    text-align: center;
  }
</style>
