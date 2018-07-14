import { http } from '../services/http'

export default {
  getArticles,
  postArticle,
  editArticle,
  deleteArticle,
  getComments
}

function getArticles () {
  return http.get('api/v1/article')
}

function postArticle (article) {
  return http.post('api/v1/article', article)
}

function editArticle (editedArticle) {
  return http.put('api/v1/article', editedArticle)
}

function deleteArticle ({ id }) {
  const url = `/api/v1/article/${id}`
  return http.delete(url)
}

function getComments ({ id }) {
  const url = `/api/v1/article/${id}/comment`
  return http.get(url)
}
