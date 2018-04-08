import Vue from 'vue'
import Vuex from 'vuex'

// import loginModule from './modules/login'
import articlesModule from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // loginModule,
    articlesModule
  }
})
