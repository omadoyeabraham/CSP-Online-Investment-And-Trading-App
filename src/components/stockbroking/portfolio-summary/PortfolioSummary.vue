<!--
  Component showing the stockbroking portfolio summary for the user

  @author Omadoye Abraham
-->
<template>
  <v-container fluid>

    <!-- Page heading and Fund account button -->
    <v-layout row >
      <v-flex d-flex align-center>
        <h3 class="font-size-20 csp-light-blue-text">Stockbroking - Portfolio Summary</h3>
      </v-flex>
      <v-flex d-flex justify-end align-start>
         <v-btn info class="blue darken-4 font-size-10 p0 ml-auto mb0"
          >
            Fund Account
         </v-btn>
      </v-flex>
    </v-layout>

    <!-- Number of accounts and account switching -->
    <v-layout row  class="mb20">
      <v-flex d-flex align-center>
        <h3 class="font-size-12 csp-blue-text font-weight-bold">NUMBER OF ACCOUNTS IN PORTFOLIO: {{numberOfAccountsInPortfolio}}</h3>
      </v-flex>
      <v-flex d-flex justify-end>

        <select class="custom-select mt10"
          v-model="selectedPortfolioAccountNo"
          v-on:change.native="changeCurrentPortfolio">
          <option v-for="(item, index) in portfolios"
            :key="index"
            v-bind:value="item.accountNo">{{item.label}}</option>
        </select>

   {{sectorData}}

      </v-flex>
    </v-layout>

    <v-layout row wrap class="">
      <!-- Market Highlights -->
      <v-flex xs12 md6 lg4 class="mb5">
        <PortfolioSummaryBox :currentPortfolio="currentPortfolio">
        </PortfolioSummaryBox>
      </v-flex>

      <!-- NSE 5 Day Chart -->
      <v-flex xs12 md6 lg4 class="mb5">
        <SectorOverview>
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

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">

      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import PortfolioSummaryBox from './PortfolioSummaryBox'
import SectorOverview from './SectorOverview'
import SectorPerformanceChart from './SectorPerformanceChart'
import SectorAllocationChart from './SectorAllocationChart'

import StockbrokingService from '../../../services/StockbrokingService'
import {mapState, mapGetters} from 'vuex'

// const initialPortfolioAccountNo = this.$store.state.stockbroking.currentPortfolio.accountNo

export default
{
  components: {
    PortfolioSummaryBox,
    SectorOverview,
    SectorPerformanceChart,
    SectorAllocationChart
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
      'sectorData': 'getPortfolioHoldingsSectorData'
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
