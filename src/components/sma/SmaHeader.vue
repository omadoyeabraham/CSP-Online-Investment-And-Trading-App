<!--
  The header for the SMA component

-->
<template>

  <v-container fluid class="p0 pl5 pr5">




    <!-- Page heading and Fund account button -->
    <v-layout row>
      <v-flex d-flex align-center>
        <h3 class="font-size-20 csp-light-blue-text">SMA - Summary</h3>
      </v-flex>
      <v-flex d-flex justify-end align-start>
        <v-btn info class="blue darken-4 font-size-10 p0 ml-auto mb0">
          Fund Account
        </v-btn>
      </v-flex>

    </v-layout>

    <v-layout row>
      <v-flex>
        <h5>
          VALUE OF PORTFOLIO: {{smaPortfolioValue | currency('&#8358; ',2)}}
        </h5>
      </v-flex>
    </v-layout>

 <hr class="mt5">


  </v-container>

</template>

<script>
export default
{
  props: [
    'smaPortfolioValue'
  ]
}
</script>

<style scoped lang="sass">

</style>
