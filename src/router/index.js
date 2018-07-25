import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/articles/ArticlesContainer'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Account from '@/components/account/AccountContainer'
import NewArticle from '@/components/articles/ArticlesNewArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles
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
