<template>
  <v-container fluid class="">


  <!-- Page heading and Fund account button -->
  <v-layout row>
    <v-flex d-flex align-center>
      <h3 class="font-size-20 csp-light-blue-text">Stockbroking - Portfolio Summary</h3>
    </v-flex>
    <v-flex d-flex justify-end align-start>
      <v-btn info class="blue darken-4 font-size-10 p0 ml-auto mb0">
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
  </v-container>
</template>

<script>
import StockbrokingService from '../../services/StockbrokingService'
import { mapState, mapGetters } from 'vuex'

export default
{
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
