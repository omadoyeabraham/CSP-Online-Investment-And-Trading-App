<template>
  <v-container fluid class="">

    <watch-list-header></watch-list-header>

    <v-container fluid grid-list-xl class="pt0">
          <v-layout row>

      <v-flex xs12 sm6 class="pl0">
        <add-watch-list
          :user="user">
        </add-watch-list>
      </v-flex>

      <v-flex xs12 sm6 class="pr0">
        <watch-list-table
          :userWatchList="formattedUserWatchList"
          >
        </watch-list-table>
      </v-flex>

      <v-snackbar success
        :timeout="snackbarTimeout"
        :top="true"
        :multi-line="snackbarMode === 'multi-line'"
        :vertical="snackbarMode === 'vertical'"
        :color="'success'"
        v-model="showWatchlistCreatedSnackbar"
        >
        {{ watchlistCreatedSnackbarText }}

      </v-snackbar>

    </v-layout>
    </v-container>

  </v-container>
</template>

<script>
  import WatchListHeader from './WatchListHeader.vue'
  import AddWatchList from './AddWatchList'
  import WatchListTable from './WatchListTable'

  import WatchListService from '../../../services/WatchListService'
  import StockbrokingService from '../../../services/StockbrokingService'

  import {mapState} from 'vuex'

  export default
  {
    /**
     * Called to calculate changes and get the user's data
     */
    beforeCreate () {
      let userWatchList = WatchListService.getWatchList()
      userWatchList.then((response) => {
        let responseData = response.data

        let marketData = StockbrokingService.getMarketData()

        marketData.then((response) => {
          StockbrokingService.commitMarketData(response.data)
        })
        console.log(responseData)
        this.userWatchList = responseData
      })
    },

    components: {
      WatchListHeader,
      AddWatchList,
      WatchListTable
    },

    data () {
      return {
        userWatchList: [],
        showWatchlistCreatedSnackbar: false,
        watchlistCreatedSnackbarText: 'Watchlist successfully created',
        snackbarTimeout: 3000,
        snackbarMode: ''
      }
    },

    computed: {
      ...mapState({
        'marketData': (store) => store.stockbroking.marketData,
        'user': (store) => store.user
      }),

      /**
       * Get the current price and %change of the watchList items
       */
      formattedUserWatchList: function () {
        let userWatchList = this.userWatchList

        userWatchList.forEach((watchListItem) => {
          // Get marketdata for the particular stock in the watchList
          let stockData = this.marketData.find((security) => {
            return security.name === watchListItem.name
          })

          let marketDataPrice = (stockData) ? parseFloat(stockData.lastTradePrice) : 0

          let priceChangePercentage = (stockData) ? parseFloat(stockData.percentChange) : 0

          watchListItem.currentPrice = marketDataPrice
          watchListItem.priceChange = priceChangePercentage
        })

        return userWatchList
      }

    },

    methods: {
      /**
       * Used to reload the watchlist data when a new item is added,
       * or an old item is deleted
       */
      retreiveUpdatedWatchListData: function () {
        let userWatchList = WatchListService.getWatchList()
        userWatchList.then((response) => {
          let responseData = response.data

          this.userWatchList = responseData
        })
      }
    }

  }
</script>

<style>

</style>
