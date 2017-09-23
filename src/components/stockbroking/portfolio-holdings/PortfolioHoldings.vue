<!--
  Shows the client's stockbroking trade history

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

    <PortfolioSwitchingHeader></PortfolioSwitchingHeader>

    <!-- TABS -->
    <vue-tabs
      activeTabColor="#1a2155"
      activeTextColor="#FFFFFF">

      <v-tab title="STOCKS">
        <PortfolioHoldingsStocks :stockHoldings="stockHoldings">
        </PortfolioHoldingsStocks>
      </v-tab>

      <v-tab title="BONDS">
        <PortfolioHoldingsbonds :bondHoldings="bondHoldings">
        </PortfolioHoldingsbonds>
      </v-tab>

    </vue-tabs>
    <!-- EOF TABS -->



  </v-container>
</template>

<script>
  import PortfolioHoldingsStocks from './PortfolioHoldings-stocks';
  import PortfolioHoldingsbonds from './PortfolioHoldings-bonds';
  import PortfolioSwitchingHeader from '../../stockbroking/PortfolioSwitchingHeader';

  import {mapGetters} from 'vuex'

  export default
  {
    components: {
      PortfolioHoldingsStocks,
      PortfolioHoldingsbonds,
      PortfolioSwitchingHeader
    },

    computed: {
      ...mapGetters({
        'stockHoldings': 'getStockPortfolioHoldings',
        'bondHoldings': 'getBondPortfolioHoldings'
      })
    }
  }
</script>

<style scoped lang="sass">

</style>
