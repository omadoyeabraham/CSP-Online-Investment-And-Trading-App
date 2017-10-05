<template>

    <div class="">

      <!-- Page heading and Fund account button -->
      <v-layout row class="p7">
        <v-flex d-flex align-center>
          <h3 class="font-size-20 csp-light-blue-text">{{headerText}}</h3>
        </v-flex>
        <v-flex d-flex justify-end align-start>
          <v-btn info class="blue darken-4 font-size-10 p0 ml-auto mb0">
            Fund Account
          </v-btn>
        </v-flex>

      </v-layout>

      <v-layout row class="pl7">
        <v-flex>
          <h5>
            VALUE OF PORTFOLIO: {{currency}}{{totalValueOfPortfolio | currency('',2)}}
          </h5>
        </v-flex>
      </v-layout> <hr class="mt0">

    </div>

</template>

<script>
  export default
  {
    props: ['headerText', 'totalValueOfPortfolio', 'currency']
  }
</script>

<style>

</style>
