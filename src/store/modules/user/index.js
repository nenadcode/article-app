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
        console.log(user)
        commit('setLoading', false)
        commit(types.RECEIVE_USER_ACCOUNT, { user: user.data })
      })
      .catch((err) => {
        return err
      })
  },
  editUserAccount ({ commit }) {
    return userApi.editUserAccount()
      .then(editedUser => {
        return editedUser
      })
      .catch((err) => {
        return err
      })
  },
  changeUserAccount ({ commit }, changed) {
    commit(types.CHANGE_USER_ACCOUNT, changed)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
