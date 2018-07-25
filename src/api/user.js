import { http } from '../services/http'

export default {
  getUserAccount,
  editUserAccount
}

function getUserAccount () {
  return http.get('api/v1/user')
}

function editUserAccount (editedUser) {
  debugger
  return http.put('api/v1/user', editedUser)
}
