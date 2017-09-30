<!--
  This component shows a market snapshot (bids, trades ,offers, price graph) for the security
  selected on the trade page
-->
<template>

  <v-card>
    <v-card-title primary-title class="blue darken-4 white--text p2 d-flex justify-center">
       <h5 class="headline mb-0 font-size-16">MARKET SNAPSHOT
         <span v-if="securityIsSelected">FOR {{selectedStock}}</span>
      </h5>
    </v-card-title>

    <v-card-media>
      {{marketSnapShot}}
      <!-- Bids, Offers and Trades -->
      <v-container fluid >
        <v-layout row>

          <!-- BIDS -->
          <v-flex xs4>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">BIDS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0">
                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">
                    <v-flex class=" ml5 font-weight-bold">TOTAL QTY</v-flex>
                    <v-flex class=" text-center font-weight-bold">BID QTY</v-flex>
                    <v-flex class=" text-right mr5 font-weight-bold">PRICE</v-flex>
                  </v-layout>

                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">

                    <!-- No selected stock -->
                    <v-flex
                      v-if="!marketSnapShot"
                      class=" ml5 text-center">
                      No Stock Selected
                    </v-flex>

                    <!-- Stock selected -->
                    <v-flex
                      v-if="marketSnapShot">
                      {{marketSnapShot.bids}}
                    </v-flex>

                  </v-layout>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- OFFERS -->
          <v-flex xs4>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">OFFERS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0">
                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">
                    <v-flex class=" ml5 font-weight-bold">TOTAL QTY</v-flex>
                    <v-flex class=" text-center font-weight-bold">OFFER QTY</v-flex>
                    <v-flex class=" text-right mr5 font-weight-bold">PRICE</v-flex>
                  </v-layout>

                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">

                    <!-- No selected stock -->
                    <v-flex
                      v-if="!marketSnapShot"
                      class=" ml5 text-center">
                      No Stock Selected
                    </v-flex>

                    <!-- Stock selected -->
                    <v-flex
                      v-if="marketSnapShot">
                      {{marketSnapShot.bids}}
                    </v-flex>

                  </v-layout>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- TRADES -->
          <v-flex xs4>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">TRADES</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="p0">
                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">
                    <v-flex class=" ml5 font-weight-bold">PRICE</v-flex>
                    <v-flex class=" text-center font-weight-bold">QUANTITY</v-flex>
                    <v-flex class=" text-right mr5 font-weight-bold">TIME</v-flex>
                  </v-layout>

                  <v-layout row
                    class="d-flex justify-between align-between pt5 pb5 box-header">

                    <!-- No selected stock -->
                    <v-flex
                      v-if="!marketSnapShot"
                      class=" ml5 text-center">
                      No Stock Selected
                    </v-flex>

                    <!-- Stock selected -->
                    <v-flex
                      v-if="marketSnapShot">
                      {{marketSnapShot.bids}}
                    </v-flex>

                  </v-layout>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- Status and Price movement chart -->
      <v-container fluid class="pt0">
        <v-layout row>
          <!-- STATUS -->
          <v-flex xs4>
            <v-card class="min-height-260px">
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">STATUS</h5>
              </v-card-title>
              <v-card-media>
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
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

    </v-card-media>
  </v-card>

</template>

<script>
import {mapState} from 'vuex'
import StockbrokingService from '../../../services/StockbrokingService'

export default
{
  data () {
    return {
      marketSnapShot: null,
      bidLevels: null,
      securityIsSelected: false
    }
  },

  computed: {
    ...mapState({
      'selectedStock': (store) => store.stockbroking.selectedSecurityOnTradePage
    })
  },

  watch: {
    selectedStock: function (newlySelectedStock) {
      if ((newlySelectedStock !== '') || (newlySelectedStock !== null)) {
        this.securityIsSelected = true
      } else {
        this.securityIsSelected = false
      }
      this.marketSnapShot = StockbrokingService.getSecurityMarketSnapShot(newlySelectedStock)
    }
  }
}
</script>

<style scoped lang="sass">
  .box-header
    border-bottom: 2px solid #EEEEEE
</style>
