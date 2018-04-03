<template>
  <v-toolbar>
    <v-toolbar-title class="title">
      <v-btn @click="goHome" flat large>Article App</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>New Article</v-btn>
      <v-btn @click="goLogin" flat>Log in</v-btn>
      <v-btn @click="goRegister" flat>Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goHome () {
      this.$router.push({ name: 'Article' })
    },
    goLogin () {
      this.$router.push({ name: 'Login' })
    },
    goRegister () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style scoped>
</style>
