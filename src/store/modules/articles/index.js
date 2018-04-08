import articlesApi from '../../../api/articles'
import * as types from './mutation-types'

const state = {
  articles: {}
}

const getters = {
  allArticles: state => state.articles
}

const actions = {
  getAllArticles ({ commit }) {
    return articlesApi.getArticles()
      .then(articles => {
        console.log('articles: ', articles)
        commit(types.RECEIVE_ARTICLES, { articles: articles.data })
        return articles
      })
  }
}

const mutations = {
  [types.RECEIVE_ARTICLES] (state, { articles }) {
    state.articles = articles
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
