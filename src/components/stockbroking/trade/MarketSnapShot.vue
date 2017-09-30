<!--
  This component shows a market snapshot (bids, trades ,offers, price graph) for the security
  selected on the trade page
-->
<template>

  <v-card>
    <v-card-title primary-title class="blue darken-4 white--text p2 d-flex justify-center">
       <h5 class="headline mb-0 font-size-16">MARKET SNAPSHOT FOR {{selectedStock}}</h5>
    </v-card-title>

    <v-card-media>

      <!-- Bids, Offers and Trades -->
      <v-container fluid>
        <v-layout row>
          <!-- BIDS -->
          <v-flex xs4>
            <v-card>
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">BIDS</h5>
              </v-card-title>
              <v-card-media>
                <v-container
                  fluid class="red p0">
                  <v-layout row class="green d-flex justify-between align-between">
                    <v-flex class="red">TOTAL QTY</v-flex>
                    <v-flex class="yellow">BID QTY</v-flex>
                    <v-flex class="pink mr0">PRICE</v-flex>
                  </v-layout>

                </v-container>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- OFFERS -->
          <v-flex xs4>
            <v-card>
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">OFFERS</h5>
              </v-card-title>
              <v-card-media>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- TRADES -->
          <v-flex xs4>
            <v-card>
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">TRADES</h5>
              </v-card-title>
              <v-card-media>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- Status and Price movement chart -->
      <v-container fluid>
        <v-layout row>
          <!-- STATUS -->
          <v-flex xs4>
            <v-card>
              <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                 <h5 class="headline mb-0 font-size-12">STATUS</h5>
              </v-card-title>
              <v-card-media>
              </v-card-media>
            </v-card>
          </v-flex>

          <!-- PRICE MOVEMENT CHART -->
          <v-flex xs8>
            <v-card>
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

export default
{
  computed: {
    ...mapState({
      'selectedStock': (store) => store.stockbroking.selectedSecurityOnTradePage
    })
  }
}
</script>

<style>

</style>
