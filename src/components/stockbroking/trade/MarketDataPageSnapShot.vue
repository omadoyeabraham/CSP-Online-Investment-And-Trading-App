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
                  <table class="table table-striped" id="bidsTable">
                    <thead>
                      <th>TOTAL QTY</th>
                      <th class="text-center">BID QTY</th>
                      <th class="text-right">PRICE</th>
                    </thead>

                    <!-- NO STOCK SELECTED -->
                    <tbody v-if="!selectedSecurityMarketSnapShot">
                      <tr class="text-center">
                        <td colspan="3">No Stock Selected</td>
                      </tr>
                    </tbody>

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
                          <td colspan="3">No OFFERS</td>
                        </tr>
                      </tbody>
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

                  </table>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>

      <!-- Status and Price movement chart -->
      <!-- <v-container fluid class="pt0">
        <v-layout row>
          STATUS
          <v-flex xs4>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">STATUS</h5>
              </v-card-title>
              <v-card-media>
                <v-container fluid class="p0">
                  <v-layout row
                      class="d-flex justify-between align-between pt5 pb5 ">

                    <v-flex
                      v-if="!selectedSecurityStatusInfo"
                      class=" ml5 mt10 text-center">
                      No Stock Selected
                    </v-flex>

                    <v-flex v-if="selectedSecurityStatusInfo">
                      <ul class="pl0" id="securityStatusList">
                        <li class="">
                          <span class="left">Last trade Price</span>
                          <span class="right">{{selectedSecurityStatusInfo.lastPrice}}</span>
                        </li>
                        <li class="">
                          <span class="left">Price Change</span>
                          <span class="right">{{selectedSecurityStatusInfo.todaysChange}}</span>
                        </li>
                        <li class="">
                          <span class="left">Price Change(%)</span>
                          <span class="right">{{selectedSecurityStatusInfo.todaysChangeP}}</span>
                        </li>
                        <li class="">
                          <span class="left">Opening Price</span>
                          <span class="right">{{selectedSecurityStatusInfo.todaysOpen}}</span>
                        </li>
                        <li class="">
                          <span class="left">High Price</span>
                          <span class="right">{{selectedSecurityStatusInfo.todaysHigh}}</span>
                        </li>
                        <li class="">
                          <span class="left">Low Price</span>
                          <span class="right">{{selectedSecurityStatusInfo.todaysLow}}</span>
                        </li>
                        <li class="">
                          <span class="left">Volume Traded</span>
                          <span class="right">{{selectedSecurityStatusInfo.volume | currency('',0)}}</span>
                        </li>
                        <li class="">
                          <span class="left">Value Traded</span>
                          <span class="right">{{selectedSecurityStatusInfo.lastPrice}}</span>
                        </li>
                      </ul>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          PRICE MOVEMENT CHART
          <v-flex xs8>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">PRICE MOVEMENT CHART</h5>
              </v-card-title>
              <v-card-media>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container> -->

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
      securityIsSelected: false
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

      let selectedStockID = (selectedStockObject.id) ? parseFloat(selectedStockObject.id) : 1

      StockbrokingService.getSecurityMarketSnapShot(newlySelectedStock)
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
