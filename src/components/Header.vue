<template>
  <div>
    <v-navigation-drawer fixed v-model="sideNav">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <router-link :to="{ name: 'articles' }">
                <v-btn flat large>
                  <v-icon left>home</v-icon>
                  All Articles</v-btn>
              </router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
      <v-divider></v-divider>
      <v-list>

      </v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="loggedIn"
          @click="logout">
          <v-list-tile-action>
            <v-icon>work_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark fixed color="primary">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="title">
        <router-link :to="{ name: 'articles' }">
          <v-btn flat large>
            <v-icon left>home</v-icon>
            All Articles</v-btn>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn
          v-if="loggedIn"
          @click="logout"
          flat>
          <v-icon left>work_off</v-icon>
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  props: ['token'],
  data () {
    return {
      sideNav: false
    }
  },
  methods: {
    ...mapActions([
      'resetUserInfo'
    ]),
    logout () {
      localStorage.removeItem('advis-token')
      this.resetUserInfo()
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    loggedIn () {
      return !!this.token
    },
    menuItems () {
      let menuItems = [
        { icon: 'person', title: 'Log In', link: '/login' },
        { icon: 'person_add', title: 'Register', link: '/register' }
      ]
      if (this.loggedIn) {
        menuItems = [
          { icon: 'note_add', title: 'New Article', link: '/new-article' },
          { icon: 'account_box', title: 'Account', link: '/account' }
        ]
      }
      return menuItems
    }
  }
}
</script>

<style scoped>

</style>
