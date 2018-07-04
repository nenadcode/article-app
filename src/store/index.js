import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './modules/user'
import articlesModule from './modules/articles'
import alertModule from './modules/alert'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    userModule,
    articlesModule,
    alertModule
  }
})
