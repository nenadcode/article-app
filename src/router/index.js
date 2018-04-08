import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/Articles'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Articles',
      component: Articles,
      meta: { auth: true }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false }
    }, {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { auth: false }
    }
  ]
})
