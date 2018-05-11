<template>
  <div id="app">
    <v-app id="inspire">
      <app-header></app-header>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header
  }
}
</script>

<style>
  .btn.btn--flat,
  .btn.btn--icon,
  .btn.btn--flat.btn--large,
  .btn.primary,
  .btn.accent {
    padding: 0;
  }
</style>
