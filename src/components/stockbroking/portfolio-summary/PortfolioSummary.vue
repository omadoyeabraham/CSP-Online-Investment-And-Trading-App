<!--
  Component showing the stockbroking portfolio summary for the user

  @author Omadoye Abraham
-->
<template>
  <v-container fluid>
    <v-layout row wrap class="">
      {{currentPortfolio}}
      <!-- Market Highlights -->
      <v-flex xs12 md6 lg4 class="mb5">
        <PortfolioSummaryBox :currentPortfolio="currentPortfolio">
        </PortfolioSummaryBox>
      </v-flex>

      <!-- NSE 5 Day Chart -->
      <v-flex xs12 md6 lg4 class="mb5">

      </v-flex>

      <!-- Top gainers and losers -->
      <v-flex xs12 md6 lg4 class="mb5">

      </v-flex>

      <!-- Fixed income -->
      <v-flex xs12 md6 lg4 class="mb5">

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

import {mapState} from 'vuex'

export default
{
  components: {
    PortfolioSummaryBox
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapState({
      'currentPortfolio': (store) => store.stockbroking.currentPortfolio
    })
  }
}
</script>

<style>

</style>
