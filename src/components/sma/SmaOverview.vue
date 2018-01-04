<!--
  Component showing the user's SMA portfolio

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

   <sma-header :smaPortfolioValue="totalValueOfSmaInvestments"></sma-header>

    <v-layout row class="d-flex justify-end pt5 pb5">

    </v-layout>

    <!-- TABS -->
    <vue-tabs
      activeTabColor="#EEE"
      activeTextColor="#428bca"
      class="">

      <v-tab title="STOCKS" class="">
        <SmaStocks :stockHoldings="stockHoldings"></SmaStocks>
      </v-tab>

      <v-tab title="BONDS" class="">
      </v-tab>

    </vue-tabs>
    <!-- EOF TABS -->


  </v-container>
</template>

<script>
  import SmaStocks from './SmaStocks';
  import SmaHeader from './SmaHeader'

  import {mapGetters} from 'vuex'

  export default
  {
    components: {
      SmaStocks,
      SmaHeader
    },

    computed: {
      ...mapGetters({
        'smaTotalEquityValue': 'getSmaTotalEquityValue',
        'totalNairaSmaCashBalance': 'getTotalNairaSmaCashBalance',
        'stockHoldings': 'getSmaStockPortfolioHoldings'
      }),
      totalValueOfSmaInvestments: function () {
        return parseFloat(this.smaTotalEquityValue) + parseFloat(this.totalNairaSmaCashBalance)
      }
    }
  }
</script>

<style  lang="sass">
  .title
    font-size: 15px !important
</style>
