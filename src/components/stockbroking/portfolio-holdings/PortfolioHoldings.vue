<!--
  Shows the client's stockbroking trade history

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

    <!-- TABS -->
    <vue-tabs
      activeTabColor="#1a2155"
      activeTextColor="#FFFFFF">

      <v-tab title="STOCKS">
        <PortfolioHoldingsStocks :stockHoldings="stockHoldings">
        </PortfolioHoldingsStocks>
      </v-tab>

      <v-tab title="BONDS">
        <PortfolioHoldingsbonds></PortfolioHoldingsbonds>
      </v-tab>

    </vue-tabs>
    <!-- EOF TABS -->



  </v-container>
</template>

<script>
  import PortfolioHoldingsStocks from './PortfolioHoldings-stocks';
  import PortfolioHoldingsbonds from './PortfolioHoldings-bonds';

  import {mapGetters} from 'vuex'

  export default
  {
    components: {
      PortfolioHoldingsStocks,
      PortfolioHoldingsbonds
    },

    computed: {
      ...mapGetters({
        'stockHoldings': 'getStockPortfolioHoldings'
      })
    }
  }
</script>

<style scoped lang="sass">

</style>
