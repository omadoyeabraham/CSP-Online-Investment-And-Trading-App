<!--
  The header for the Watchlist component

-->
<template>
  <v-container fluid class="p0 pl5 pr5">

    <!-- Page heading and Fund account button -->
    <v-layout row>
      <v-flex d-flex align-center>
        <h3 class="font-size-20 csp-light-blue-text">Stockbroking - My Watchlist</h3>
      </v-flex>
      <v-flex d-flex justify-end align-start class="mr5">
        <v-btn :to="'/fund-account'" info  class="fund-account-btn font-size-10 p0 ml-auto mb0 mr0">
          Fund My Account
        </v-btn>
      </v-flex>

    </v-layout>

    <hr class="mt5">

  </v-container>
</template>

<script>
export default
{

}
</script>

<style scoped lang="sass">
  .fund-account-btn
    background: #324e85 !important
    border-radius: 5px
    border: none
    padding: 5px 10px !important
</style>
