<template>
  <v-container fluid class="p0">

  <!-- Page heading and Fund account button -->
  <v-layout row class="align-end">
    <v-flex d-flex align-center>
      <h3 class="font-size-20 csp-light-blue-text mb0">{{title}}</h3>
    </v-flex>
    <v-flex d-flex justify-end align-start>
      <v-btn :to="'/fund-account'" info  class="fund-account-btn font-size-12 p0 ml-auto mb0 mr0">
        Fund My Account
      </v-btn>
    </v-flex>
  </v-layout>

    <!-- Number of accounts and account switching -->
    <v-layout row  class="mb10">
      <v-flex d-flex align-end>
        <h3 class="font-size-12 csp-blue-text font-weight-bold">NUMBER OF ACCOUNTS IN PORTFOLIO: {{numberOfAccountsInPortfolio}}</h3>
      </v-flex>
      <v-flex d-flex justify-end align-end class="pb5">
        <form class="form-inline">
        <label class="mr-sm-2 font-size-11 font-weight-bold mt10" for="selectAccount">SELECT ACCOUNT:</label>
        <select class="custom-select mt10 form-group" id="selectAccount"
          v-model="selectedPortfolioAccountNo"
          v-on:change.native="changeCurrentPortfolio">
          <option v-for="(item, index) in portfolios"
            :key="index"
            v-bind:value="item.accountNo">{{item.label}}</option>

        </select>
        </form>

   <!-- {{sectorData}} -->

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StockbrokingService from '../../services/StockbrokingService'
import { mapState, mapGetters } from 'vuex'

export default
{
  props: ['title'],

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

<style scoped lang="sass">
  #selectAccount
    background: #4c7396
    color: #FFFFFF
    border: 2px solid transparent

  .fund-account-btn
    background: #324e85 !important
    border-radius: 5px
    border: none
    padding: 5px 10px !important

</style>
