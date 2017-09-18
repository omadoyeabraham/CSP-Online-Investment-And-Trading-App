<!--
  Component showing the stockbroking portfolio summary for the user

  @author Omadoye Abraham
-->
<template>
  <v-container fluid>
    <v-layout row wrap class="">

      <!-- Market Highlights -->
      <v-flex xs12 md6 lg4 class="mb5">
        <MarketHighlightsComponent></MarketHighlightsComponent>
      </v-flex>

      <!-- NSE 5 Day Chart -->
      <v-flex xs12 md6 lg4 class="mb5">
        <NseFiveDayChart></NseFiveDayChart>
      </v-flex>

      <!-- Top gainers and losers -->
      <v-flex xs12 md6 lg4 class="mb5">
        <TopGainersLosers></TopGainersLosers>
      </v-flex>

      <!-- Fixed income -->
      <v-flex xs12 md6 lg4 class="mb5">
        <FixedIncome></FixedIncome>
      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">
        <BusinessNews></BusinessNews>
      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md6 lg4 class="mb5">
        <BusinessNews></BusinessNews>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import MarketHighlightsComponent from '../dashboard/MarketHighlights';
import NseFiveDayChart from '../dashboard/NseFiveDayChart';
import TopGainersLosers from '../dashboard/TopGainersLosers';
import FixedIncome from '../dashboard/FixedIncome';
import BusinessNews from '../dashboard/BusinessNews';

export default
{
  components: {
    MarketHighlightsComponent,
    NseFiveDayChart,
    TopGainersLosers,
    FixedIncome,
    BusinessNews
  },

  data () {
    return {

    }
  }
}
</script>

<style>

</style>
