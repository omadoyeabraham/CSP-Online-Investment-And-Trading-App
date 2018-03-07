<template>

    <div class="">

      <!-- Page heading and Fund account button -->
      <v-layout row class="p7">
        <v-flex d-flex align-center>
          <h3 class="font-size-20 csp-light-blue-text">{{headerText}}</h3>
        </v-flex>
        <v-flex d-flex justify-end align-start>
            <v-btn :to="'/fund-account'" info  class="fund-account-btn font-size-12 p0 ml-auto mb0 mr0">
               Fund My Account
            </v-btn>
        </v-flex>

      </v-layout>

      <v-layout row class="pl7">
        <v-flex>
          <h5 v-if="showTotalValue" class="font-weight-bold">
            <span class="font-size-11">VALUE OF PORTFOLIO:</span>
            <span class="font-size-17 font-weight-normal">{{currency}}{{totalValueOfPortfolio | currency('',2)}}</span>
          </h5>
        </v-flex>
      </v-layout> <hr class="mt0">

    </div>

</template>

<script>
  export default
  {
    props: ['headerText', 'totalValueOfPortfolio', 'currency', 'showTotalValue']
  }
</script>

<style scoped lang="sass">
    .fund-account-btn
      background: #324e85 !important
      border-radius: 5px
      border: none
      padding: 5px 10px !important
</style>
