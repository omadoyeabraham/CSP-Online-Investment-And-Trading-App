<!--
  Component showing the stockbroking portfolio summary for the user

  @author Omadoye Abraham
-->
<template>
  <v-container fluid>

    <PortfolioSwitchingHeader
       :title="'Stockbroking - Portfolio Summary'">
    </PortfolioSwitchingHeader>

    <v-layout row wrap class="">
      <!-- Market Highlights -->
      <v-flex xs12 md6 lg4 class="mb5">
        <PortfolioSummaryBox :currentPortfolio="currentPortfolio">
        </PortfolioSummaryBox>
      </v-flex>

       <!-- Sector Overview -->
      <v-flex xs12 md6 lg4 class="mb5 red">
        <SectorOverview
          :sectorAllocationChartData="sectorAllocationChartData"
          :sectorPerformanceChartData="sectorPerformanceChartData"
          :sectorData="sectorData">
        </SectorOverview>
      </v-flex>

      <!-- Top gainers and losers -->
      <v-flex xs12 md6 lg4 class="mb5">
        <SectorAllocationChart
          :sectorAllocationChartData="sectorAllocationChartData"
          :sectorData="sectorData">
        </SectorAllocationChart>
      </v-flex>

      <!-- Fixed income -->
      <v-flex xs12 md6 lg4 class="mb5">
        <SectorPerformanceChart
          :sectorPerformanceChartData="sectorPerformanceChartData"
          :sectorData="sectorData">
        </SectorPerformanceChart>
      </v-flex>

      <!-- NSE 5 Day Chart -->
      <v-flex xs12 md6 lg4 class="mb5">
        <StockAllocationChart
          :stockAllocationChartData="stockAllocationChartData"
          :stockData="stockData">
        </StockAllocationChart>
      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">
        <StockPerformanceChart
          :stockPerformanceChartData="stockPerformanceChartData"
          :stockData="stockData">
        </StockPerformanceChart>
      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">
         <BondAllocationChart
          :bondAllocationChartData="bondAllocationChartData"
          :bondData="bondData">
        </BondAllocationChart>
      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">
        <BondPerformanceChart
          :bondPerformanceChartData="bondPerformanceChartData"
          :bondData="bondData">
        </BondPerformanceChart>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import PortfolioSummaryBox from './PortfolioSummaryBox'
import SectorOverview from './SectorOverview'
import SectorPerformanceChart from './SectorPerformanceChart'
import SectorAllocationChart from './SectorAllocationChart'
import StockAllocationChart from './StockAllocationChart'
import StockPerformanceChart from './StockPerformanceChart'
import BondAllocationChart from './BondAllocationChart'
import BondPerformanceChart from './BondPerformanceChart'
import PortfolioSwitchingHeader from '../../stockbroking/PortfolioSwitchingHeader'

import StockbrokingService from '../../../services/StockbrokingService'
import {mapState, mapGetters} from 'vuex'

export default
{
  components: {
    PortfolioSummaryBox,
    SectorOverview,
    SectorPerformanceChart,
    SectorAllocationChart,
    StockAllocationChart,
    StockPerformanceChart,
    BondAllocationChart,
    BondPerformanceChart,
    PortfolioSwitchingHeader
  },

  data () {
    return {
      itemText: 'label',
      itemValue: 'accountNo',
      selectedPortfolioAccountNo: this.$store.state.stockbroking.currentPortfolio.accountNo
    }
  },

  computed: {
    ...mapState({
      'currentPortfolio': (store) => store.stockbroking.currentPortfolio,
      'portfolios': (store) => store.stockbroking.portfolios
    }),
    ...mapGetters({
      'numberOfAccountsInPortfolio': 'numberOfAccountsInPortfolio',
      'sectorAllocationChartData': 'sectorAllocationChartData',
      'sectorPerformanceChartData': 'sectorPerformanceChartData',
      'sectorData': 'getPortfolioHoldingsSectorData',
      'stockData': 'getPortfolioHoldingsStockData',
      'stockAllocationChartData': 'stockAllocationChartData',
      'stockPerformanceChartData': 'stockPerformanceChartData',
      'bondData': 'getPortfolioHoldingsBondData',
      'bondAllocationChartData': 'bondAllocationChartData',
      'bondPerformanceChartData': 'bondPerformanceChartData'
    })
  },

  watch: {
    selectedPortfolioAccountNo: function (newlySelectedPortfolioAccountNo) {
      StockbrokingService.setCurrentPortfolio(newlySelectedPortfolioAccountNo)
    }
  }
}
</script>

<style>

</style>
