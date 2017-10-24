<template>

  <v-container fluid grid-list-xl>
    <v-layout row wrap class="">

      <v-flex xs12 class="pb0">
        <h3 class="font-size-20 page-header pb10 csp-light-blue-text">
          Dashboard
        </h3>
      </v-flex>

      <!-- Market Highlights -->
      <v-flex xs12 md4 lg4 class="mb5">
        <MarketHighlightsComponent
          :marketHighlights='marketHighlights'>
        </MarketHighlightsComponent>
      </v-flex>

      <!-- NSE 5 Day Chart -->
      <v-flex xs12 md4 lg4 class="mb5">
        <NseFiveDayChart
          :chartData="chartData">
        </NseFiveDayChart>
      </v-flex>

      <!-- Top gainers and losers -->
      <v-flex xs12 md4 lg4 class="mb5">
        <TopGainersLosers
          :topGainers="topGainers"
          :topLosers="topLosers">
        </TopGainersLosers>
      </v-flex>

      <!-- Fixed income -->
      <v-flex xs12 md4 lg4 class="mb5">
        <FixedIncome></FixedIncome>
      </v-flex>

      <!-- Foreign exchange -->
      <v-flex xs12 md4 lg4 class="mb5">
        <ForeignExchange
          :foreignExchange="foreignExchange">
        </ForeignExchange>
      </v-flex>

      <!-- Business News -->
      <v-flex xs12 md4 lg4 class="mb5">
        <BusinessNews
          :newsFeed="newsFeed">
        </BusinessNews>
      </v-flex>

    </v-layout>
  </v-container>

</template>

<script>
  import {mapGetters} from 'vuex';

  import MarketHighlightsComponent from './MarketHighlights';
  import NseFiveDayChart from './NseFiveDayChart';
  import TopGainersLosers from './TopGainersLosers';
  import FixedIncome from './FixedIncome';
  import BusinessNews from './BusinessNews';
  import ForeignExchange from './ForeignExchange'

  import {getDashboardData} from '../../services/DashboardService'

  export default
  {
    beforeCreate () {
      getDashboardData()
    },

    components: {
      MarketHighlightsComponent,
      NseFiveDayChart,
      TopGainersLosers,
      FixedIncome,
      BusinessNews,
      ForeignExchange
    },

    computed: {

      ...mapGetters({
        marketHighlights: 'marketHighlights',
        chartData: 'chartData',
        topGainers: 'topGainers',
        topLosers: 'topLosers',
        newsFeed: 'newsFeed',
        foreignExchange: 'foreignExchange'
      })

    },

    data () {
      return {

      }
    }
  }
</script>

<style>

</style>
