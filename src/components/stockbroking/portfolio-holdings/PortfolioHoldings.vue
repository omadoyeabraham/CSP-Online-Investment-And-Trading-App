<!--
  Shows the client's stockbroking Portfolio holdings

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

    <PortfolioSwitchingHeader
      title="Stockbroking - Portfolio Holdings"></PortfolioSwitchingHeader>

    <!-- TABS -->
    <vue-tabs
      activeTabColor="#EEE"
      activeTextColor="#428bca"
      class="">

      <v-tab title="STOCKS" class="">
        <PortfolioHoldingsStocks :stockHoldings="stockHoldings">
        </PortfolioHoldingsStocks>
      </v-tab>

      <v-tab title="BONDS" class="">
        <PortfolioHoldingsbonds
          :bondHoldings="bondHoldings">
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

<style  lang="sass">
  .title
    font-size: 15px !important
</style>
