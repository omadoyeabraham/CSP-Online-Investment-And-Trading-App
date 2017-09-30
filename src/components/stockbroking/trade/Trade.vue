<template>
  <v-container
    fluid>

     <!-- Portfolio Switching Header -->
    <PortfolioSwitchingHeader
      :title="'Stockbroking - Trade'">
    </PortfolioSwitchingHeader>

    <v-layout row>

      <!-- Mandate Form -->
      <v-flex
        xs4>
        <mandate-form>
        </mandate-form>
      </v-flex>

      <!-- Bids,offers,trades,status and price movement -->
      <v-flex
        sm8
        class="">
        <market-snap-shot>
        </market-snap-shot>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
   import PortfolioSwitchingHeader from '../PortfolioSwitchingHeader'
   import MandateForm from './MandateForm'
   import MarketSnapShot from './MarketSnapShot'

export default
{
  components: {
       PortfolioSwitchingHeader,
       MandateForm,
       MarketSnapShot
  }

}
</script>

<style>

</style>
