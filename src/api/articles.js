import { http } from '../services/http'

export default {
  getArticles,
  getComments
}

function getArticles () {
  return http.get('api/v1/article')
}

function getComments ({ id }) {
  const url = `/api/v1/article/${id}/comment`
  return http.get(url)
}
