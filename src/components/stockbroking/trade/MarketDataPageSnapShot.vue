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
            <v-card class="min-height-250px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">BIDS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0">
                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">
                    <v-flex class=" ml15 font-weight-bold">TOTAL QTY</v-flex>
                    <v-flex class=" text-center font-weight-bold">BID QTY</v-flex>
                    <v-flex class=" text-right mr15 font-weight-bold">PRICE</v-flex>
                  </v-layout>

                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 ">

                    <!-- No selected stock -->
                    <v-flex
                      v-if="!selectedSecurityMarketSnapShot"
                      class=" ml5 text-center">
                      No Stock Selected
                    </v-flex>

                    <!-- Stock selected -->
                    <v-flex
                      v-if="selectedSecurityMarketSnapShot">

                        <div v-if="selectedSecurityMarketSnapShot.bids.length">
                        <v-container fluid class="p0 alternate max-height-180px min-height-180px" style="overflow-y: auto; overflow-x: hidden" >
                          <v-layout row class="d-flex justify-between pt5 pb5 " v-for="(bid,index) in selectedSecurityMarketSnapShot.bids" :key="index">
                            <v-flex class=" ml15 ">{{bid.total | currency('', 2)}}</v-flex>
                            <v-flex class="ml35">{{bid.qty | currency('', 2)}}</v-flex>
                            <v-flex class="text-right mr15 ">{{bid.price | currency('',2)}}</v-flex>
                          </v-layout>
                        </v-container>
                      </div>

                      <div v-else class="text-center font-size-12 font-weight-bold">
                        No Bids
                      </div>
                    </v-flex>

                  </v-layout>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- OFFERS -->
          <v-flex xs4>
            <v-card class="min-height-250px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">OFFERS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0">
                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">
                    <v-flex class=" ml15 font-weight-bold">TOTAL QTY</v-flex>
                    <v-flex class=" text-center font-weight-bold">OFFER QTY</v-flex>
                    <v-flex class=" text-right mr15 font-weight-bold">PRICE</v-flex>
                  </v-layout>

                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5">

                    <!-- No selected stock -->
                    <v-flex
                      v-if="!selectedSecurityMarketSnapShot"
                      class=" ml5 text-center">
                      No Stock Selected
                    </v-flex>

                    <!-- Stock selected -->
                    <v-flex
                      v-if="selectedSecurityMarketSnapShot">
                      <div v-if="selectedSecurityMarketSnapShot.offers.length">
                        <v-container fluid class="p0 alternate max-height-180px min-height-180px" style="overflow-y: auto; overflow-x: hidden">
                          <v-layout row class="d-flex justify-between pt5 pb5 " v-for="(offer,index) in selectedSecurityMarketSnapShot.offers" :key="index">
                            <v-flex class=" ml15 ">{{offer.total | currency('', 2)}}</v-flex>
                            <v-flex class=" text-center ">{{offer.qty | currency('', 2)}}</v-flex>
                            <v-flex class=" text-right mr15 ">{{offer.price | currency('', 2)}}</v-flex>
                          </v-layout>
                        </v-container>
                      </div>
                      <div v-else class="text-center font-size-12 font-weight-bold">
                        No Offers
                      </div>
                    </v-flex>

                  </v-layout>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- TRADES -->
          <v-flex xs4 >
            <v-card class="min-height-250px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">TRADES</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0">
                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">
                    <v-flex class=" ml15 font-weight-bold">PRICE</v-flex>
                    <v-flex class=" text-center font-weight-bold">QUANTITY</v-flex>
                    <v-flex class=" text-right mr15 font-weight-bold">TIME</v-flex>
                  </v-layout>

                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5">

                    <!-- No selected stock -->
                    <v-flex
                      v-if="!selectedSecurityMarketSnapShot"
                      class=" ml5 text-center">
                      No Stock Selected
                    </v-flex>

                    <!-- Stock selected -->
                    <v-flex
                      v-if="selectedSecurityMarketSnapShot">

                        <div v-if="selectedSecurityMarketSnapShot.trades.length">
                        <v-container fluid class="p0 alternate max-height-180px min-height-180px " style="overflow-y: auto; overflow-x: hidden">
                          <v-layout row class="d-flex justify-between pt5 pb5  " v-for="(trade,index) in selectedSecurityMarketSnapShot.trades" :key="index">
                            <v-flex class=" ml15 ">{{trade.tradePrice | currency('', 2)}}</v-flex>
                            <v-flex class="ml65">{{trade.tradeSize | currency('', 2)}}</v-flex>
                            <v-flex class="text-right mr15 ">{{trade.time | moment('HH:mm:ss')}}</v-flex>
                          </v-layout>
                        </v-container>
                      </div>

                      <div v-else class="text-center font-size-12 font-weight-bold">
                        No Trades
                      </div>
                    </v-flex>

                  </v-layout>

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
</style>
