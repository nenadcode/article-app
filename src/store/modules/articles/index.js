import articlesApi from '../../../api/articles'
import * as types from './mutation-types'

const state = {
  articles: null,
  filteredArticles: [],
  pagination: {
    totalPages: 1,
    currentPage: 1,
    resultsPerPage: 10
  },
  article: null,
  comments: []
}

const getters = {
  allArticles: state => state.articles,
  filteredArticles: state => state.filteredArticles,
  allComments: state => state.comments,
  pagination: state => state.pagination,
  article: state => state.article
}

const actions = {
  getAllArticles ({ commit, dispatch }) {
    return articlesApi.getArticles()
      .then(articles => {
        let data = commit(types.RECEIVE_ARTICLES, { articles: articles.data })
        Promise.resolve(data)
          .then(() => {
            dispatch('setPaginationData', articles.data.length)
            dispatch('getFilteredArticles', 1)
          })
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  getFilteredArticles ({ commit, state, dispatch }, page) {
    let allArticles = state.articles.map(article => article)
    let articles = allArticles.splice((page - 1) * 10, 10)
    dispatch('setArticleComments', articles)
    commit(types.SET_CURRENT_PAGE, page)
    commit(types.SET_FILTERED_ARTICLES, articles)
  },
  setPaginationData ({ commit, state }, page) {
    let totalPages = page / state.pagination.resultsPerPage
    commit(types.SET_TOTAL_PAGES, Math.ceil(totalPages))
  },
  postArticle ({ commit, dispatch }, { article }) {
    commit('setLoading', true)
    return articlesApi.postArticle(article)
      .then(article => {
        commit('setLoading', false)
        dispatch('resetEditedArticle', article)
        return article
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  editArticle ({ commit, dispatch }, { editedArticle }) {
    commit('setLoading', true)
    return articlesApi.editArticle(editedArticle)
      .then(editedArticle => {
        commit('setLoading', false)
        dispatch('newEditedArticle', editedArticle.data)
        return editedArticle
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  newEditedArticle ({ commit, dispatch }, payload) {
    let newArticle = payload
    let comment = dispatch('getComments', {id: payload.id})
    Promise.resolve(comment)
      .then(response => {
        newArticle.comment = response.data
        commit(types.SET_EDITED_ARTICLE, newArticle)
      })
  },
  resetEditedArticle ({ commit }) {
    commit(types.RESET_EDITED_ARTICLE)
  },
  deleteArticle ({ commit }, { id }) {
    commit('setLoading', true)
    return articlesApi.deleteArticle({ id })
      .then(() => {
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  getComments (context, { id }) {
    return articlesApi.getComments({ id })
      .then(data => {
        return data
      })
  },
  setArticleComments ({ commit, dispatch }, payload) {
    payload.map(article => {
      dispatch('getComments', { id: article.id })
        .then(res => {
          commit(types.SET_COMMENT, {id: article.id, comment: res.data})
        })
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
  [types.SET_EDITED_ARTICLE] (state, newArticle) {
    let articles = state.filteredArticles.map(article => {
      if (article.id === newArticle.id) {
        article = newArticle
      }
      return article
    })
    state.filteredArticles = articles
  },
  [types.RESET_EDITED_ARTICLE] (state) {
    state.article = null
  },
  [types.RECEIVE_COMMENTS] (state, payload) {
    state.comments = payload
  },
  [types.RESET_COMMENTS] (state) {
    state.comments = {}
  },
  [types.SET_COMMENT] (state, { id, comment }) {
    let comments = state.filteredArticles.map(article => {
      if (article.id === id) {
        article.comment = comment
      }
      return article
    })
    state.filteredArticles = comments
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
