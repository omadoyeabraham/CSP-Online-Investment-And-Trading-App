<!--This component controls the portfolio summary box on the STB - Portfolio Summary Page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-card class="white lighten-2 card h-100" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">PORTFOLIO SUMMARY</div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">
        <!-- CHN NO -->
        <li class="list-group-item font-weight-bold">
          CLEARING HOUSE NO
          <span class="ml-auto font-weight-normal">{{currentPortfolio.clearingHouseNo}}</span>
        </li>
        <!-- CSCS NO -->
        <li class="list-group-item font-weight-bold">
          CSCS NO
          <span class="ml-auto font-weight-normal">{{currentPortfolio.accountNo}}</span>
        </li>
        <!-- Current Value -->
        <li class="list-group-item font-weight-bold">
          CURRENT VALUE
          <span class="ml-auto font-weight-normal">{{currentPortfolioTotalValue}}</span>
        </li>
        <!-- Acquisition Cost -->
        <li class="list-group-item font-weight-bold">
          ACQUISITION COST
          <span class="ml-auto font-weight-normal">{{currentPortfolioAcquisitionCost}}</span>
        </li>
        <!-- Gain or Loss -->
        <li class="list-group-item font-weight-bold">
          GAIN/LOSS
          <span class="ml-auto font-weight-normal">{{currentPortfolioGainOrLoss}}</span>
        </li>
        <!-- Gain or Loss percentage -->
        <li class="list-group-item font-weight-bold">
          GAIN/LOSS (%)
          <span class="ml-auto font-weight-normal">{{currentPortfolioGainOrLossPercentage}}</span>
        </li>
      </ul>
    </div>

  </v-card>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default
  {
    props: ['currentPortfolio'],

    computed: {
      ...mapGetters({
        'currentPortfolioTotalValue': 'currentPortfolioTotalValue',
        'currentPortfolioGainOrLoss': 'currentPortfolioGainOrLoss',
        'currentPortfolioGainOrLossPercentage': 'currentPortfolioGainOrLossPercentage',
        'currentPortfolioAcquisitionCost': 'currentPortfolioAcquisitionCost'
      })
    }
  }
</script>

<style>

</style>
