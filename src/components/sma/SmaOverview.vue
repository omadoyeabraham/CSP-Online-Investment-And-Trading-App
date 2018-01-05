<!--
  Component showing the user's SMA portfolio

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

   <sma-header :smaPortfolioValue="smaTotalValue"></sma-header>

    <v-layout row class="d-flex justify-end pt5 pb5">

    </v-layout>

    <!-- TABS -->
    <vue-tabs
      activeTabColor="#EEE"
      activeTextColor="#428bca"
      class="">

      <v-tab title="EQUITIES" class="">
        <SmaStocks :stockHoldings="stockHoldings"></SmaStocks>
      </v-tab>

      <v-tab title="FIXED INCOME" class="">
        <sma-fixed-income></sma-fixed-income>
      </v-tab>

    </vue-tabs>
    <!-- EOF TABS -->


  </v-container>
</template>

<script>
  import SmaStocks from './SmaStocks';
  import SmaFixedIncome from './SmaFixedIncome'
  import SmaHeader from './SmaHeader'

  import {mapGetters} from 'vuex'

  export default
  {
    components: {
      SmaStocks,
      SmaHeader,
      SmaFixedIncome
    },

    computed: {
      ...mapGetters({
        'smaTotalValue': 'getSmaTotalInvestmentsValue',
        'totalNairaSmaCashBalance': 'getTotalNairaSmaCashBalance',
        'stockHoldings': 'getSmaStockPortfolioHoldings'
      })
    }
  }
</script>

<style  lang="sass">
  .title
    font-size: 15px !important
</style>
