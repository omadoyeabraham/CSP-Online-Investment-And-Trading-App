<template>
  <v-container class=""
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
          :orderType = "redirectedOrderType"
          :securityName = "redirectedInstrument">
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

  </v-container>
</template>

<script>
   import PortfolioSwitchingHeader from '../PortfolioSwitchingHeader'
   import MandateForm from './MandateFormVee'
   import MarketSnapShot from './MarketSnapShot'

export default
{
  created () {
       // Assign the orderType and instrument if the user is being redirected to this component from any of the BUY/SELL buttons
       if (this.$route.params.instrument && this.$route.params.orderType) {
         this.redirectedInstrument = this.$route.params.instrument
         this.redirectedOrderType = this.$route.params.orderType
       }
  },
  data () {
       return {
         redirectedInstrument: null,
         redirectedOrderType: null
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
