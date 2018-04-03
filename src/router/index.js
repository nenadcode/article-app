import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/Article'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Article',
      component: Article,
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
