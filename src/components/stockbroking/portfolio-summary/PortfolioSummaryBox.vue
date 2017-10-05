<!--This component controls the portfolio summary box on the STB - Portfolio Summary Page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-card class="white lighten-2 card h-100" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">PORTFOLIO SUMMARY</div>
    </div>

    <!-- Card body -->
    <div class="card-block pt0">
      <ul class="list-group list-group-flush black--text">
        <!-- CHN NO -->
        <li class="list-group-item ">
          CLEARING HOUSE NO
          <span class="ml-auto font-weight-normal">{{currentPortfolio.clearingHouseNo}}</span>
        </li>
        <!-- CSCS NO -->
        <li class="list-group-item ">
          CSCS NO
          <span class="ml-auto font-weight-normal">{{currentPortfolio.accountNo}}</span>
        </li>
        <!-- Current Value -->
        <li class="list-group-item ">
          CURRENT VALUE
          <span class="ml-auto font-weight-normal">{{currentPortfolioTotalValue | currency('&#8358;', 2)}}</span>
        </li>
        <!-- Acquisition Cost -->
        <li class="list-group-item ">
          ACQUISITION COST
          <span class="ml-auto font-weight-normal">{{currentPortfolioAcquisitionCost | currency('&#8358;', 2)}}</span>
        </li>
        <!-- Gain or Loss -->
        <li class="list-group-item ">
          GAIN/LOSS
          <span class="ml-auto font-weight-normal">

            <span class="red--text" v-if="currentPortfolioGainOrLoss < 0">
             &#8358; ({{Math.abs(currentPortfolioGainOrLoss) | currency('', 2)}})
            </span>
            <span class="green--text" v-else-if="currentPortfolioGainOrLoss > 0">
                {{currentPortfolioGainOrLoss | currency('&#8358;', 2)}}
            </span>
            <span class="" v-else>
               {{currentPortfolioGainOrLoss | currency('&#8358;', 2)}}
            </span>

          </span>
        </li>
        <!-- Gain or Loss percentage -->
        <li class="list-group-item">
          GAIN/LOSS (%)
          <span class="ml-auto font-weight-normal">

            <span class="red--text" v-if="currentPortfolioGainOrLossPercentage < 0">
              ({{Math.abs(currentPortfolioGainOrLossPercentage) | currency('', 2)}}) %
            </span>
            <span class="green--text" v-else-if="currentPortfolioGainOrLossPercentage > 0">
                {{currentPortfolioGainOrLossPercentage | currency('', 2)}} %
            </span>
            <span class="" v-else>
               {{currentPortfolioGainOrLossPercentage | currency('', 2)}} %
            </span>

          </span>

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
