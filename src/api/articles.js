import { http } from '../services/http'

export default {
  getArticles
}

function getArticles () {
  return http.get('api/v1/article')
}
