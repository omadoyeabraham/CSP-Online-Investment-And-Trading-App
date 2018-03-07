<template>
  <v-container class="pt0"
    fluid>

     <!-- Portfolio Switching Header -->
    <PortfolioSwitchingHeader
      :title="'Stockbroking - Trade'">
    </PortfolioSwitchingHeader>

    <v-layout row>

      <!-- Mandate Form -->
      <v-flex
        sm12 lg4
        class="mb10">
        <mandate-form
          :redirectedOrderType = "redirectedOrderType"
          :redirectedSecurityName = "redirectedInstrument"
          ref="mandateForm">
        </mandate-form>
      </v-flex>

      <!-- Bids,offers,trades,status and price movement -->
      <v-flex
        sm12 lg8
        class="">
        <market-snap-shot>
        </market-snap-shot>
      </v-flex>

    </v-layout>

      <v-btn id="openLeaveTradePageDialog"
        style="display: none" color="primary" dark @click.native.stop="showLeaveTradePageDialog = true"></v-btn>
        <!-- Dialog before leaving trade page -->
    <v-dialog v-model="showLeaveTradePageDialog"
      lazy absolute
      :max-width='500'>

      <v-card>
        <v-card-title class="d-flex justify-center  p15 pt20">
          <h4 class="font-size-20">Are you sure you want to discard your changes?</h4>
        </v-card-title>

          <v-card-text>
          </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            color="green darken-1"
            style="background: #4c7396; color: #FFFFFF"
            @click="callNextFunction"
          >
            Yes, cancel mandate
          </v-btn>
          <v-btn
            color="green darken-1"
            class="red darken-1 white--text"
            @click="discardLeaveTradePageDialog"
            >
            No, stay on page
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
   import PortfolioSwitchingHeader from '../PortfolioSwitchingHeader'
   import MandateForm from './MandateFormVee'
   import MarketSnapShot from './MarketSnapShot'

   import {mapActions} from 'vuex'

export default
{
  created () {
       // Assign the orderType and instrument if the user is being redirected to this component from any of the BUY/SELL buttons
       if (this.$route.params.instrument && this.$route.params.orderType) {
         this.redirectedInstrument = this.$route.params.instrument
         this.redirectedOrderType = this.$route.params.orderType
       }

       // Continously poll the server every 5 seconds for updated market data
       this.getUpdatedMarketData = setInterval(this.updateMarketData, 10000)

       // Add event listener to trigger an action before leaving the trade page
       window.addEventListener('beforeunload', this.leavingPage)
  },

  beforeDestroy () {
       clearInterval(this.getUpdatedMarketData)
  },

    /**
    * Function called when a user tires to leave the trade page
    * Should display a popup if the user has already entered some data in the trade form
    *
    */
  beforeRouteLeave (to, from, next) {
       // Perform the check only if we are not redirecting to the route called after placing a mandate
       if (to.path !== '/stb/trade-history?') {
        // Do not show the popup if the mandate form has not yet been touched
         if (this.$refs.mandateForm.mandateFormHasNotBeenTouched()) {
           next()
         }

         // Set the next function to be used
         this.nextFunction = next

        // Display the cancel popup modal/dialog
         document.querySelector('#openLeaveTradePageDialog').click()

        /**
         * Stopping the event propagation because of the auto-close quirk that vuetify's dialog
         * popup has if the click event is not triggered from within the activator slot of the
         * dialog component
         */
         event.stopPropagation()
       } else {
         // Continue on to the trade history page
         next()
       }
  },

  data () {
       return {
         showLeaveTradePageDialog: false,
         nextFunction: null,
         getUpdatedMarketData: null,
         redirectedInstrument: null,
         redirectedOrderType: null
       }
  },

  methods: {
       ...mapActions({
         updateMarketData: 'updateMarketData'
       }),

       /**
        * Used to call router.next() when leaving the trade page
        */
       callNextFunction: function () {
         let next = this.nextFunction
         next()
       },

      /**
       * Cancel the leave mandate page form
       */
       discardLeaveTradePageDialog: function () {
        // Close the dialog modal
         this.showLeaveTradePageDialog = false
       }
  },

  components: {
       PortfolioSwitchingHeader,
       MandateForm,
       MarketSnapShot
  }

}
</script>

<style>

</style>
