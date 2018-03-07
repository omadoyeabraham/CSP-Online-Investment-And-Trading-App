<!--
  Shows the client's stockbroking Portfolio holdings

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>


    <PortfolioSwitchingHeader
      title="Stockbroking - Portfolio Holdings"></PortfolioSwitchingHeader>

    <v-layout row class="d-flex justify-end pt5 pb5">
      <v-flex class="d-flex justify-end font-size-12 font-weight-bold xs12" style="position: absolute; top: 130px; left: 0; right: 10px">
        <span class="ml15 mr15 csp-blue-text">CURRENT VALUE: {{currentPortfolioTotalValue | currency('&#8358;', 2)}}</span>
        <span class="ml15 mr15 csp-blue-text">TOTAL COST: {{currentPortfolioAcquisitionCost | currency('&#8358;', 2)}}</span>
        <span class="ml15">
            <span class="csp-blue-text">GAIN/LOSS:</span>
            <span class="red--text" v-if="currentPortfolioGainOrLoss < 0">
              ({{Math.abs(currentPortfolioGainOrLoss) | currency('&#8358;', 2)}})
            </span>
            <span class="green--text" v-else-if="currentPortfolioGainOrLoss > 0">
                {{currentPortfolioGainOrLoss | currency('&#8358;', 2)}}
            </span>
            <span class="" v-else>
               {{currentPortfolioGainOrLoss | currency('&#8358;', 2)}}
            </span>
        </span>
      </v-flex>
    </v-layout>

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
        'bondHoldings': 'getBondPortfolioHoldings',
        'currentPortfolioTotalValue': 'currentPortfolioTotalValue',
        'currentPortfolioGainOrLoss': 'currentPortfolioGainOrLoss',
        'currentPortfolioGainOrLossPercentage': 'currentPortfolioGainOrLossPercentage',
        'currentPortfolioAcquisitionCost': 'currentPortfolioAcquisitionCost'
      })
    }
  }
</script>

<style  lang="sass">
  .title
    font-size: 15px !important
</style>
