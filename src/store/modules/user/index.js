import userApi from '../../../api/user'
import * as types from './mutation-types'

const state = {
  user: null
}

const getters = {
  userInfo: state => state.user
}

const actions = {
  getUser ({ commit }) {
    commit('setLoading', true)
    return userApi.getUserAccount()
      .then(user => {
        commit('setLoading', false)
        commit(types.RECEIVE_USER_ACCOUNT, { user: user.data })
      })
      .catch((error) => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  editUserAccount ({ commit }, editedUser) {
    commit('setLoading', true)
    return userApi.editUserAccount(editedUser)
      .then(editedUser => {
        commit('setLoading', false)
        return editedUser
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  changeAccountInfo ({ commit }, changed) {
    commit(types.CHANGE_USER_ACCOUNT, changed)
  },
  resetUserInfo ({ commit }) {
    commit(types.RESET_USER_INFO)
  }
}

const mutations = {
  [types.RECEIVE_USER_ACCOUNT] (state, { user }) {
    state.user = user
  },
  [types.CHANGE_USER_ACCOUNT] (state, { property, value }) {
    if (!state.userInfo) {
      return
    }
    state.userInfo[property] = value
  },
  [types.RESET_USER_INFO] (state) {
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
