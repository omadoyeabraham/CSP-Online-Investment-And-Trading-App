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

      </v-flex>

    </v-layout>



    <!-- Mandate Form -->

  </v-container>
</template>

<script>
   import PortfolioSwitchingHeader from '../PortfolioSwitchingHeader'
   import MandateForm from './MandateForm'

export default
{
  components: {
       PortfolioSwitchingHeader,
       MandateForm
  }

}
</script>

<style>

</style>
