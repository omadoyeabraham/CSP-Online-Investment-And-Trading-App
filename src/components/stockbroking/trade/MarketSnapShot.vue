<!--
  This component shows a market snapshot (bids, trades ,offers, price graph) for the security
  selected on the trade page
-->
<template>

  <v-card>
    <v-card-title primary-title class="p2 d-flex justify-center">
       <h5 class="pt10 mb-0 font-size-12 font-weight-bold">MARKET SNAPSHOT
         <span v-if="selectedSecurityMarketSnapShot">
           <span v-if="selectedSecurityMarketSnapShot.companyName"> FOR {{selectedSecurityMarketSnapShot.companyName}}</span>
         </span>
      </h5>
    </v-card-title>

    <v-card-media>

      <!-- Bids, Offers and Trades -->
      <v-container fluid class="pt5 pb5 p0">
        <v-layout row>

          <!-- BIDS -->
          <v-flex xs4>
            <v-card class="">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">BIDS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0 min-height-240px max-height-240px" style="overflow-y: auto">

                  <!-- BIDS TABLE -->
                  <table class="table table-striped" id="bidsTable" >
                    <thead>
                      <th>TOTAL QTY</th>
                      <th class="text-center">BID QTY</th>
                      <th class="text-right">PRICE</th>
                    </thead>

                    <!-- Show Loader when loading data -->
                    <template v-if="loadingStockData">
                      <tbody>
                        <tr>
                          <td colspan="3" class="text-center">
                            <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                            <span class="font-size-12 ml5">Loading data</span>
                          </td>
                        </tr>
                      </tbody>
                    </template>

                    <!-- Show data when not loading new data -->
                    <template v-if="!loadingStockData">

                      <!-- NO STOCK SELECTED -->
                      <tbody v-if="!selectedSecurityMarketSnapShot">
                        <tr class="text-center">
                          <td colspan="3">No Stock Selected</td>
                        </tr>
                      </tbody>

                      <!-- STOCK WAS SELECTED -->
                      <template v-if="selectedSecurityMarketSnapShot">

                        <!-- BIDS EXIST -->
                        <tbody v-if="selectedSecurityMarketSnapShot.bids.length">
                          <tr v-for="(bid,index) in selectedSecurityMarketSnapShot.bids" :key="index">
                            <td>{{bid.total | currency('', 0)}}</td>
                            <td class="text-center">{{bid.qty | currency('', 0)}}</td>
                            <td class="text-right">{{bid.price | currency('',2)}}</td>
                          </tr>
                        </tbody>

                        <!-- NO BIDS -->
                        <tbody v-if="!selectedSecurityMarketSnapShot.bids.length">
                          <tr class="text-center">
                            <td colspan="3">No Bids</td>
                          </tr>
                        </tbody>
                      </template>

                    </template>

                  </table>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- OFFERS -->
          <v-flex xs4>
            <v-card class="">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">OFFERS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0 min-height-240px max-height-240px" style="overflow-y: auto">

                   <!-- OFFERS TABLE -->
                  <table class="table table-striped" id="offersTable">
                    <thead>
                      <th>TOTAL QTY</th>
                      <th class="text-center">OFFER QTY</th>
                      <th class="text-right">PRICE</th>
                    </thead>

                    <!-- Show loading icon when loading data -->
                    <template v-if="loadingStockData">
                      <tbody>
                        <tr>
                          <td colspan="3" class="text-center">
                            <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                            <span class="font-size-12 ml5">Loading data</span>
                          </td>
                        </tr>
                      </tbody>
                    </template>

                    <!-- Show data when not loading data -->
                    <template v-if="!loadingStockData">
                      <!-- NO STOCK SELECTED -->
                      <tbody v-if="!selectedSecurityMarketSnapShot">
                        <tr class="text-center">
                          <td colspan="3">No Stock Selected</td>
                        </tr>
                      </tbody>

                      <template v-if="selectedSecurityMarketSnapShot">

                        <!-- OFFERS EXIST -->
                        <tbody v-if="selectedSecurityMarketSnapShot.offers.length">
                          <tr v-for="(offer,index) in selectedSecurityMarketSnapShot.offers" :key="index">
                            <td>{{offer.total | currency('', 0)}}</td>
                            <td class="text-center">{{offer.qty | currency('', 0)}}</td>
                            <td class="text-right">{{offer.price | currency('',2)}}</td>
                          </tr>
                        </tbody>

                        <!-- NO OFFERS -->
                        <tbody v-if="!selectedSecurityMarketSnapShot.offers.length">
                          <tr class="text-center">
                            <td colspan="3">No Offers</td>
                          </tr>
                        </tbody>
                      </template>

                    </template>

                  </table>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- TRADES -->
          <v-flex xs4>
            <v-card class="">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">TRADES</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0 min-height-240px max-height-240px" style="overflow-y: auto">

                   <!-- TRADES TABLE -->
                  <table class="table table-striped" id="tradesTable">
                    <thead>
                      <th>PRICE</th>
                      <th class="text-center">QUANTITY</th>
                      <th class="text-right">TIME</th>
                    </thead>

                    <!-- Show loading icon when pulling data -->
                    <template v-if="loadingStockData">
                      <tbody>
                        <tr>
                          <td colspan="3" class="text-center">
                            <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                            <span class="font-size-12 ml5">Loading data</span>
                          </td>
                        </tr>
                      </tbody>
                    </template>

                    <!-- Show data when available -->
                    <template v-if="!loadingStockData">
                      <!-- NO STOCK SELECTED -->
                      <tbody v-if="!selectedSecurityMarketSnapShot">
                        <tr class="text-center">
                          <td colspan="3">No Stock Selected</td>
                        </tr>
                      </tbody>

                    <template v-if="selectedSecurityMarketSnapShot">

                      <!-- TRADES EXIST -->
                      <tbody v-if="selectedSecurityMarketSnapShot.trades.length">
                        <tr v-for="(trade,index) in selectedSecurityMarketSnapShot.trades" :key="index">
                          <td>{{trade.tradePrice | currency('', 2)}}</td>
                          <td class="text-center">{{trade.tradeSize | currency('', 2)}}</td>
                          <td class="text-right">{{trade.time | moment('HH:mm:ss')}}</td>
                        </tr>
                      </tbody>

                      <!-- NO TRADES -->
                      <tbody v-if="!selectedSecurityMarketSnapShot.trades.length">
                        <tr class="text-center">
                          <td colspan="3">No Trades</td>
                        </tr>
                      </tbody>
                    </template>

                    </template>

                  </table>


                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- Status and Price movement chart -->
      <v-container fluid class="p0 ">
        <v-layout row>
          <!-- STATUS -->
          <v-flex xs4>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">STATUS</h5>
              </v-card-title>
              <v-card-media>
                <v-container fluid class="p0">

                  <!-- Show loader when loading data -->
                  <template v-if="loadingStockData">
                    <v-layout row class="d-flex justify-center align-center text-center pt5 pb5">
                      <v-flex>
                         <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                        <span class="font-size-12 ml5">Loading data</span>
                      </v-flex>
                    </v-layout>
                  </template>

                  <!-- Show data when available -->
                  <template v-if="!loadingStockData">
                    <v-layout row class="d-flex justify-between align-between pt5 pb5 ">

                      <v-flex
                        v-if="!selectedSecurityStatusInfo"
                        class=" ml5 mt10 text-center">
                        No Stock Selected
                      </v-flex>

                      <v-flex v-if="selectedSecurityStatusInfo">
                        <ul class="pl0" id="securityStatusList">
                          <li class="">
                            <span class="left">Last trade Price</span>
                            <span class="right">{{selectedSecurityStatusInfo.lastPrice | currency('&#8358;',2)}}</span>
                          </li>
                          <li class="">
                            <span class="left">Price Change</span>
                            <span class="right" v-if="selectedSecurityStatusInfo.priceChange < 0">
                              ({{Math.abs(selectedSecurityStatusInfo.priceChange) | currency('',2)}})
                            </span>
                            <span class="right" v-else>{{selectedSecurityStatusInfo.priceChange | currency('',2)}}</span>
                          </li>
                          <li class="">
                            <span class="left">Price Change(%)</span>
                            <span class="right" v-if="selectedSecurityStatusInfo.priceChangeP < 0">
                              ({{Math.abs(selectedSecurityStatusInfo.priceChangeP) | currency('',2)}})
                            </span>
                            <span class="right" v-else>{{selectedSecurityStatusInfo.priceChangeP | currency('',2)}}</span>
                          </li>
                          <li class="">
                            <span class="left">Opening Price</span>
                            <span class="right">{{selectedSecurityStatusInfo.todaysOpen| currency('&#8358;',2)}}</span>
                          </li>
                          <li class="">
                            <span class="left">High Price</span>
                            <span class="right">{{selectedSecurityStatusInfo.todaysHigh| currency('&#8358;',2)}}</span>
                          </li>
                          <li class="">
                            <span class="left">Low Price</span>
                            <span class="right">{{selectedSecurityStatusInfo.todaysLow| currency('&#8358;',2)}}</span>
                          </li>
                          <li class="">
                            <span class="left">Volume Traded</span>
                            <span class="right">{{selectedSecurityStatusInfo.volumeTraded | currency('',0)}}</span>
                          </li>
                          <li class="">
                            <span class="left">Value Traded</span>
                            <span class="right">{{selectedSecurityMarketSnapShot.valueTraded| currency('&#8358;',2)}}</span>
                          </li>
                        </ul>
                      </v-flex>

                    </v-layout>
                  </template>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- PRICE MOVEMENT CHART -->
          <v-flex xs8>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">PRICE MOVEMENT CHART</h5>
              </v-card-title>
              <v-card-media>

                <!--No stock selected -->
                 <v-flex
                      v-if="!selectedSecurityMarketSnapShot"
                      class=" ml5 mt15 text-center">
                      No Stock Selected
                    </v-flex>

                <!-- Stock selected -->
                <div v-if="selectedSecurityMarketSnapShot">

                  <!-- Price movement Data exists -->
                  <div v-if="selectedSecurityMarketSnapShot.priceMovements.length">
                    <highcharts
                      :options="priceMovementChartData"
                      ref="highcharts"
                      style="height: 200px; max-width: 100%">
                    </highcharts>

                  </div>

                  <!-- No price movement data -->
                  <v-flex v-else class=" ml5 mt15 text-center font-size-12 font-weight-bold">
                    No price information available
                  </v-flex>

                </div>

                <price-movement-chart>

                </price-movement-chart>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

    </v-card-media>
  </v-card>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import StockbrokingService from '../../../services/StockbrokingService'
import {ChartService} from '../../../services/ChartsService'

import PriceMovementChart from './PriceMovementChart'

export default
{
  components: {
    PriceMovementChart
  },

  beforeDestroy () {
    StockbrokingService.resetMarketSnapShot()
    clearInterval(this.getUpdatedDataForSelectedSecurity)
  },

  created () {
    // Update the data for the selected security on the trade page every 1 minute
    this.getUpdatedDataForSelectedSecurity = setInterval(this.obtainUpdatedDataForSelectedSecurity, 30000)
  },

  data () {
    return {
      getUpdatedDataForSelectedSecurity: null,
      marketSnapShot: null,
      bidLevels: null,
      securityIsSelected: false,
      loadingStockData: false
    }
  },

  computed: {
    ...mapState({
      'selectedStock': (store) => store.stockbroking.selectedSecurityOnTradePage,
      'selectedSecurityMarketSnapShot': (store) => store.stockbroking.selectedSecurityMarketSnapShot,
      'selectedSecurityStatusInfo': (store) => store.stockbroking.selectedSecurityStatusInfo
    }),
    ...mapGetters({
      'allSecurities': 'getSecurityNames'
    }),

    priceMovementChartData: function () {
      let chartData = ChartService.getCspAreaChart(this.selectedSecurityMarketSnapShot.priceMovements)

      return chartData
    }
  },

  methods: {
    ...mapActions({
      'updateDataForSelectedSecurity': 'updateMarketDataForSelectedSecurity'
    }),

    obtainUpdatedDataForSelectedSecurity: function () {
      this.updateDataForSelectedSecurity()
    }
  },

  watch: {
    selectedStock: function (newlySelectedStock) {
      // Check whether or not a security is selected
      if ((newlySelectedStock !== '') || (newlySelectedStock !== null)) {
        this.securityIsSelected = true
      } else {
        this.securityIsSelected = false
      }

      // get the particular stock that was selected
      // let selectedStockObject = this.allSecurities.find(function (security) {
      //   return security.value === newlySelectedStock
      // })

      // // Get the ID for the selected stock
      // let selectedStockID = (selectedStockObject) ? parseFloat(selectedStockObject.id) : 0

       // Show the loading spinner for stock data
      this.loadingStockData = true;

      // Make API calls to get the market snapshot (BIDS, TRADES and OFFERS) for the selected stock
      let gettingSecurityMarketSnapShot = StockbrokingService.getSecurityMarketSnapShot(newlySelectedStock)
      gettingSecurityMarketSnapShot.then((response) => {
        // Set the market data for the stock that was selected.
        StockbrokingService.setSecurityMarketSnapShot(response.data)

        this.loadingStockData = false;
      })

      StockbrokingService.getSecurityStatusInfo(newlySelectedStock)
    }
  }
}
</script>

<style scoped lang="sass">
  .box-header
    border-bottom: 2px solid #EEEEEE
  .alternate
    > div:nth-child(even)
      background: #EEE
  #securityStatusList
    li:nth-child(even)
      background: #EEE
    li
      font-size: 11px
      padding-top: 5px
      padding-bottom: 5px
      span.left
        margin-left: 10px
        font-weight: normal
      span.right
        margin-right: 10px
  #bidsTable,
  #offersTable,
  #tradesTable
    thead
      th
        font-weight: bold
        color: #000000
        font-size: 11px
    tbody
      tr
        td
          font-size: 11px
</style>
