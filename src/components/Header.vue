<template>
  <div>
    <v-navigation-drawer fixed v-model="sideNav">
      <v-list v-if="!loggedIn">
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <!-- <v-list-tile>
          <v-list-tile-content>
            <router-link :to="{ name: 'login' }">
              <v-btn flat>
                <v-icon left>person</v-icon>
                Log in
              </v-btn>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <router-link :to="{ name: 'register' }">
              <v-btn flat>
                <v-icon left>person_add</v-icon>
                Register
              </v-btn>
            </router-link>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>

      <v-list v-else>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <router-link :to="{ name: 'new-article' }">
              <v-btn flat>
                <v-icon left>note_add</v-icon>
                New Article
              </v-btn>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>

        <!-- <v-list-tile>
          <v-list-tile-content>
            <router-link :to="{ name: 'account' }">
              <v-btn flat>
                <v-icon left>account_box</v-icon>
                Account
              </v-btn>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-btn @click="logout" flat>
              <v-icon left>work_off</v-icon>
              Log out
            </v-btn>
          </v-list-tile-content>
        </v-list-tile> -->
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
      <v-toolbar-items class="hidden-xs-only" v-if="!loggedIn">

        <router-link :to="{ name: 'login' }">
          <v-btn flat>
            <v-icon left>person</v-icon>
            Log in</v-btn>
        </router-link>

        <router-link :to="{ name: 'register' }">
          <v-btn flat>
            <v-icon left>person_add</v-icon>
            Register</v-btn>
        </router-link>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-xs-only" v-else>
        <router-link :to="{ name: 'new-article' }">
          <v-btn flat>
            <v-icon left>note_add</v-icon>
            New Article
          </v-btn>
        </router-link>

        <router-link :to="{ name: 'account' }">
          <v-btn flat>
            <v-icon left>account_box</v-icon>
            Account
          </v-btn>
        </router-link>

        <v-btn @click="logout" flat>
          <v-icon left>work_off</v-icon>
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['token'],
  data () {
    return {
      menuItems: [
        { icon: 'person', title: 'Log In', link: '/login' },
        { icon: 'person_add', title: 'Register', link: '/register' },
        { icon: 'note_add', title: 'New Article', link: '/new-article' },
        { icon: 'account_box', title: 'Account', link: '/account' },
        { icon: 'work_off', title: 'Log Out', link: '' }
      ],
      sideNav: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('advis-token')
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    loggedIn () {
      return !!this.token
    }
  }
}
</script>

<style scoped>

</style>
