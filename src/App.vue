<template>
  <div id="app" >
    <router-link to="/home">Go to Homepage</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped lang="sass">
  #app
    height: 90%
</style>
