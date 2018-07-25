const state = {
  loading: false,
  storeError: null
}

const getters = {
  loading: state => state.loading,
  storeError: state => state.storeError
}

const actions = {
  clearError ({ commit }) {
    commit('clearError')
  }
}

const mutations = {
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.storeError = payload
  },
  clearError (state) {
    state.storeError = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
