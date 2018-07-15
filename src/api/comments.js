import { http } from '../services/http'

export default {
  getComments,
  postComment,
  editComment,
  deleteComment
}

function getComments ({ id }) {
  const url = `/api/v1/article/${id}/comment`
  return http.get(url)
}

function postComment ({ id }, commentData) {
  const url = `/api/v1/article/${id}/comment`
  return http.post(url, commentData)
}

function editComment (id, editedComment) {
  const url = `/api/v1/article/${id}/comment`
  return http.post(url, editedComment)
}

function deleteComment (id) {
  const url = `/api/v1/article/${id.articleId}/comment/${id.commentId}`
  return http.delete(url)
}
