import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/Articles'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Account from '@/components/Account'
import NewArticle from '@/components/NewArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles,
      meta: { auth: true }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
    }, {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { auth: false }
    }, {
      path: '/account',
      name: 'account',
      component: Account,
      meta: { auth: true }
    }, {
      path: '/new-article',
      name: 'new-article',
      component: NewArticle,
      meta: { auth: true }
    }
  ]
})
