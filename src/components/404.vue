<template>
  <v-container>

  <v-alert info value="true">
    404.. You have stumbled out of control
    <router-link :to="{name: 'Login'}"> Go Home </router-link>
  </v-alert>

  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
