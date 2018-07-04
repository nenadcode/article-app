import articlesApi from '../../../api/articles'
import * as types from './mutation-types'

const state = {
  articles: [],
  filteredArticles: [],
  pagination: {
    totalPages: 1,
    currentPage: 1,
    resultsPerPage: 10
  },
  comments: []
}

const getters = {
  allArticles: state => state.articles,
  filteredArticles: state => state.filteredArticles,
  allComments: state => state.comments,
  pagination: state => state.pagination
}

const actions = {
  getAllArticles ({ dispatch }) {
    return articlesApi.getArticles()
      .then(articles => {
        dispatch('setPaginationData', articles.data.length)
        dispatch('setArticleComments', articles)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getFilteredArticles ({ commit, state }, page) {
    let allArticles = state.articles.map(article => article)
    let articles = allArticles.splice((page - 1) * 10, 10)
    commit(types.SET_CURRENT_PAGE, page)
    commit(types.SET_FILTERED_ARTICLES, articles)
  },
  setPaginationData ({ commit, state }, page) {
    let totalPages = page / state.pagination.resultsPerPage
    commit(types.SET_TOTAL_PAGES, Math.ceil(totalPages))
  },
  getComments (context, { id }) {
    return articlesApi.getComments({ id })
      .then(data => {
        return data
      })
  },
  setArticleComments ({ commit, dispatch }, payload) {
    let articles = payload.data
    let promise = articles.map(article => {
      dispatch('getComments', { id: article.id })
        .then(res => {
          article.comments = res
        })
    })
    Promise.resolve([promise])
      .then(() => {
        commit(types.RECEIVE_ARTICLES, { articles: articles })
        dispatch('getFilteredArticles', 1)
      })
  },
  resetComments ({ commit }) {
    commit(types.RESET_COMMENTS)
  }
}

const mutations = {
  [types.RECEIVE_ARTICLES] (state, { articles }) {
    state.articles = articles
  },
  [types.SET_FILTERED_ARTICLES] (state, articles) {
    state.filteredArticles = articles
  },
  [types.SET_TOTAL_PAGES] (state, page) {
    state.pagination.totalPages = page
  },
  [types.SET_CURRENT_PAGE] (state, page) {
    state.pagination.currentPage = page
  },
  [types.SET_RESULTS_PER_PAGE] (state, page) {
    state.pagination.resultsPerPage = page
  },
  [types.RECEIVE_COMMENTS] (state, payload) {
    state.comments = payload
  },
  [types.RESET_COMMENTS] (state) {
    state.comments = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
