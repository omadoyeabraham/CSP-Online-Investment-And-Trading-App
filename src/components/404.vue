<template>
  <v-container>

  <v-alert info value="true">
    Oops an unknown system error has occured. Refresh your browser to clear this error.
    <!-- <router-link :to="{name: 'Login'}"> Go Home </router-link> -->
  </v-alert>

  </v-container>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)
    console.log(next)
  }
}
</script>

<style>

</style>
