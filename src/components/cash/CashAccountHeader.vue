<template>
  <v-container fluid class="">

  <!-- Page heading and Fund account button -->
  <v-layout row>
    <v-flex d-flex align-center>
      <h3 class="font-size-20 csp-light-blue-text">Cash Account Statement</h3>
    </v-flex>
    <v-flex d-flex justify-end align-start>
      <v-btn info class="blue darken-4 font-size-10 p0 ml-auto mb0">
        Fund Account
      </v-btn>
    </v-flex>
  </v-layout>


    <!-- Number of accounts and account switching -->
    <v-layout row  class="mb20">
      <v-flex d-flex align-center>
        <h3 class="font-size-11 csp-blue-text font-weight-bold">NUMBER OF CASH ACCOUNTS: {{totalNumberOfCashAccounts}} ACCOUNTS</h3>
      </v-flex>
      <v-flex d-flex justify-end>

        <select class="custom-select mt10"
          v-model="selectedPortfolioAccountNo"
          v-on:change.native="changeCurrentPortfolio">
          <option v-for="(item, index) in cashAccounts"
            :key="index"
            v-bind:value="item.id">{{item.label}}</option>
        </select>

   <!-- {{sectorData}} -->

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default
  {
    props: ['cashAccounts'],

    computed: {
      ...mapGetters({
        'totalNumberOfCashAccounts': 'getTotalNumberOfCashAccounts'
      })
    }
  }
</script>

<style>

</style>
