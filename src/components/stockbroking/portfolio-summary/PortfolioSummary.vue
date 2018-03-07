<!--
  Component showing the stockbroking portfolio summary for the user

  @author Omadoye Abraham
-->
<template>
  <v-container fluid class="pt0">

    <PortfolioSwitchingHeader
       :title="'Stockbroking - Portfolio Summary'">
    </PortfolioSwitchingHeader>

    <v-layout row wrap class="">
      <!-- Portfolio Summary Box -->
      <v-flex xs12 md6 lg4 class="mb5 max-height-245px min-height-245px">
        <PortfolioSummaryBox :currentPortfolio="currentPortfolio">
        </PortfolioSummaryBox>
      </v-flex>

       <!-- Sector Overview -->
      <v-flex xs12 md6 lg4 class="mb5 max-height-245px min-height-245px">
        <SectorOverview
          :sectorAllocationChartData="sectorAllocationChartData"
          :sectorPerformanceChartData="sectorPerformanceChartData"
          :sectorData="sectorData">
        </SectorOverview>
      </v-flex>

      <!-- Stock Overview -->
      <v-flex xs12 md6 lg4 class="mb5 max-height-245px min-height-245px">
        <stocks-overview
          :stockAllocationChartData="stockAllocationChartData"
          :stockPerformanceChartData="stockPerformanceChartData"
          :stockData="stockData"
          :sectorData="sectorData">
        </stocks-overview>
      </v-flex>

      <!-- Recent Orders -->
      <v-flex xs12 md6 lg4 class="mb5 max-height-245px min-height-245px">
        <recent-orders :currentPortfolio="currentPortfolio">
        </recent-orders>
      </v-flex>

      <!-- Bond Allocation -->
      <v-flex xs12 md6 lg4 class="mb5 max-height-245px min-height-245px">
         <BondAllocationChart
          :bondAllocationChartData="bondAllocationChartData"
          :bondData="bondData">
        </BondAllocationChart>
      </v-flex>

      <!-- Bond Performance -->
      <v-flex xs12 md6 lg4 class="mb5 max-height-245px min-height-245px">
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
import RecentOrders from './RecentOrders'
import SectorOverview from './SectorOverview'
import StocksOverview from './StocksOverview'
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
    RecentOrders,
    SectorOverview,
    StocksOverview,
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
