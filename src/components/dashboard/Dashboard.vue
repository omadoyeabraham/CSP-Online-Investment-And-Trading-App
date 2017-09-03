<template>
  <!-- <div class="row">
    <div class="col-xs-12 col-md-6 col-lg-4 col-xlg-4">
      <MarketHighlightsComponent></MarketHighlightsComponent>
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4 col-xlg-4">
      <MarketHighlightsComponent></MarketHighlightsComponent>
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4 col-xlg-4">
      <MarketHighlightsComponent></MarketHighlightsComponent>
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4 col-xlg-4">
      <MarketHighlightsComponent></MarketHighlightsComponent>
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4 col-xlg-4">
      <MarketHighlightsComponent></MarketHighlightsComponent>
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4 col-xlg-4">
      <MarketHighlightsComponent></MarketHighlightsComponent>
    </div>
  </div> -->
  <v-container fluid>
    <v-layout row wrap class="grey">

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

    </v-layout>
  </v-container>

</template>

<script>
  import MarketHighlightsComponent from './MarketHighlights';
  import NseFiveDayChart from './NseFiveDayChart';
  import TopGainersLosers from './TopGainersLosers';

  export default
  {
    components: {
      MarketHighlightsComponent,
      NseFiveDayChart,
      TopGainersLosers
    },

    data () {
      return {

      }
    }
  }
</script>

<style>

</style>
