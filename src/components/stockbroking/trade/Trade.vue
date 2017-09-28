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
        sm4
        class="card lighten-4 elevation-5">
        <v-card-title class="bg-csp-light-blue d-flex align-center justify-center">
          <h3 class="white--text text-center p20">Place a mandate</h3>
        </v-card-title>
        <v-container fluid class="p0 pr5">
          <v-layout row class="pl5 pr5">

            <!-- Order type -->
            <v-flex sm12 class="">
              <v-select
                class=""
                box
                :label="'Order Type'"
                :items="orderTypes"
                v-model="orderType"
                :rules="orderTypeRules"
                :append-icon="'search'"
                required>
              </v-select>
            </v-flex>

            <!-- Stock -->
            <v-flex sm12>
               <v-text-field
                :label="'Stock'"
                v-model="orderType"
                :rules="orderTypeRules"
                required>
              </v-text-field>
            </v-flex>


            <!-- Quantity Units -->
            <v-flex sm12 class="">
              <v-text-field
                :label="'Quantity Units'"
                v-model="orderType"
                :rules="orderTypeRules"
                required>
              </v-text-field>
            </v-flex>

            <!-- Order Terms -->
            <v-flex sm12>
               <v-text-field
                :label="'Order Terms'"
                v-model="orderType"
                :rules="orderTypeRules"
                required>
              </v-text-field>
            </v-flex>

            <!-- Price Option -->
            <v-flex sm12>
               <v-text-field
                :label="'Price Option'"
                v-model="orderType"
                :rules="orderTypeRules"
                required>
              </v-text-field>
            </v-flex>


          </v-layout>
        </v-container>

        <!-- Buttons -->
        <v-container fluid class="p0 pr5">
          <v-layout row>

            <!-- Preview-->
            <v-flex >
              <v-btn primary
                class="ml0">
                Preview Order
              </v-btn>
               <!-- Cancel Order -->
              <v-btn
                class="ml0 red white--text">
                Cancel Order
              </v-btn>
            </v-flex>


          </v-layout>
        </v-container>
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
  },

  data () {
       return {
         orderType: '',
         orderTypeRules: [
           (v) => !!v || 'An order type is required'
         ],
         orderTypes: [
           { text: 'Buy' },
           { text: 'Sell' }
         ]
       }
  }
}
</script>

<style>

</style>
