<!--
  This component shows a market snapshot (bids, trades ,offers, price graph) for the security
  selected on the trade page
-->
<template>

  <v-card class="p0">

    <v-card-title primary-title class=" blue--text text--darken-4 p2 d-flex justify-center">
       <h5 class="headline mb-0 font-size-16">ORDER BOOK
         <span v-if="selectedSecurityMarketSnapShot">
           <span v-if="selectedSecurityMarketSnapShot.companyName"> FOR {{selectedSecurityMarketSnapShot.companyName}}</span>
         </span>
      </h5>
    </v-card-title>

    <v-card-media>
      <!-- Bids, Offers and Trades -->
      <v-container fluid class="p0">
        <v-layout row>

          <!-- BIDS -->
          <v-flex xs4>
            <v-card class="">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                <h5 class="headline mb-0 font-size-12">BIDS</h5>
              </v-card-title>
              <v-card-media>
                <v-container fluid class="p0 min-height-240px max-height-240px" style="overflow-y: auto">

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
                <v-container fluid class="p0 min-height-240px max-height-240px" style="overflow-y: auto">

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
                <v-container fluid class="p0 min-height-240px max-height-240px" style="overflow-y: auto">

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


    </v-card-media>
  </v-card>

</template>

<script>
import {mapState, mapGetters} from 'vuex'
import StockbrokingService from '../../../services/StockbrokingService'

export default
{

  beforeDestroy () {
    StockbrokingService.resetMarketSnapShot()
  },
  data () {
    return {
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
    })
  },

  watch: {
    selectedStock: function (newlySelectedStock) {
      if ((newlySelectedStock !== '') || (newlySelectedStock !== null)) {
        this.securityIsSelected = true
      } else {
        this.securityIsSelected = false
      }

      let selectedStockObject = this.allSecurities.find(function (security) {
        return security.value === newlySelectedStock
      })

      let selectedStockID = (selectedStockObject.id) ? parseFloat(selectedStockObject.id) : 0

      // Show the loading spinner for stock data
      this.loadingStockData = true;

      // Make API calls to get the market snapshot (BIDS, TRADES and OFFERS) for the selected stock
      let gettingSecurityMarketSnapShot = StockbrokingService.getSecurityMarketSnapShot(newlySelectedStock)
      gettingSecurityMarketSnapShot.then((response) => {
        // Set the market data for the stock that was selected.
        StockbrokingService.setSecurityMarketSnapShot(response.data)

        this.loadingStockData = false;
      })

      StockbrokingService.getSecurityStatusInfo(selectedStockID)
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
  #bidsTable,
  #offersTable,
  #tradesTable
    thead
      th
        font-weight: bold
        color: #000
        padding-left: 5px
        padding-right: 5px
    tbody
      tr
        td
          font-size: 11px
</style>
