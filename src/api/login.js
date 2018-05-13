import { http } from '../services/http'

export default {
  onLogin
}

function onLogin() {
  return http.post('oauth2/token', user)
}
