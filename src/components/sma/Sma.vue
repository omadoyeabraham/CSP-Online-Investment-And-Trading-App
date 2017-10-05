<!--
  This component handles the SMA portfolio of the user
-->


<template>

  <v-container fluid>
    <!-- Header -->
    <sma-header
      :smaPortfolioValue="totalValueOfSmaInvestments">
    </sma-header>

    <!-- Portfolio summary and allocation charts -->
    <v-layout row class="">

      <!-- Portfolio Summary -->
      <v-flex xs4 class="">
        <sma-portfolio-summary
          :smaEquitiesTotal="smaTotalEquityValue"
          :smaCashTotal="totalNairaSmaCashBalance"
          :smaPortfolioTotal="totalValueOfSmaInvestments">
        </sma-portfolio-summary>
      </v-flex>

      <!-- Asset allocation Chart -->
      <v-flex xs4>
        <sma-assetallocation-chart
          :chartData='smaAllocationChartData'>

        </sma-assetallocation-chart>
      </v-flex>

      <!-- Equity allocation chart -->
      <v-flex xs4>

      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import SmaHeader from './SmaHeader'
import SmaPortfolioSummary from './SmaPortfolioSummary'
import SmaAssetallocationChart from './SmaAssetAllocationChart'
import SmaEquityAllocationChart from './SmaEquityAllocationChart'

import { mapGetters } from 'vuex'
export default
{
  components: {
    SmaHeader,
    SmaPortfolioSummary,
    SmaAssetallocationChart,
    SmaEquityAllocationChart
  },

  computed: {
    ...mapGetters({
      'smaTotalEquityValue': 'getSmaTotalEquityValue',
      'totalNairaSmaCashBalance': 'getTotalNairaSmaCashBalance',
      'smaAllocationChartData': 'getSmaAllocationChartData'
    }),
    totalValueOfSmaInvestments: function () {
      return parseFloat(this.smaTotalEquityValue) + parseFloat(this.totalNairaSmaCashBalance)
    }
  }
}
</script>

<style>

</style>
