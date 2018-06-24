import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './modules/user'
import articlesModule from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    articlesModule
  }
})
