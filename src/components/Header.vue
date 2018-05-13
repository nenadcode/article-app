<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="title">
      <v-btn @click="goHome" flat large>Article App</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!loggedIn">
      <v-btn flat>New Article</v-btn>
      <v-btn @click="goLogin" flat v-if="!loggedIn">Log in</v-btn>
      <v-btn @click="goRegister" flat v-if="!loggedIn">Register</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn flat>New Article</v-btn>
      <v-btn @click="logout" flat v-if="loggedIn">Log out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  props: ['token'],
  methods: {
    goHome () {
      this.$router.push({ name: 'Article' })
    },
    goLogin () {
      this.$router.push({ name: 'Login' })
    },
    goRegister () {
      this.$router.push({ name: 'Register' })
    },
    logout () {
      localStorage.removeItem('advis-token')
      this.$router.push({ name: 'Login' })
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
