<template>
  <v-container fluid>

    <!-- Portfolio Switching Header -->
    <PortfolioSwitchingHeader :title="'Stockbroking - Trade'">
    </PortfolioSwitchingHeader>

    <v-layout row>

      <!-- Mandate Form -->
      <v-flex sm4 class="">
        <v-container fluid class="">
          <v-layout row class="card">

            <!-- Order type -->
            <v-flex sm6 class="">
              <input class="form-control" type="text" value="Artisanal kale" id="example-text-input">
            </v-flex>

            <!-- Stock -->
            <v-flex sm6>
              <v-text-field :label="'Stock'" v-model="orderType" :rules="orderTypeRules" required>
              </v-text-field>
            </v-flex>

            <!-- Quantity Units -->
            <v-flex sm6 class="">
              <v-text-field :label="'Quantity Units'" v-model="orderType" :rules="orderTypeRules" required>
              </v-text-field>
            </v-flex>

            <!-- Order Terms -->
            <v-flex sm6>
              <v-text-field :label="'Order Terms'" v-model="orderType" :rules="orderTypeRules" required>
              </v-text-field>
            </v-flex>

          </v-layout>
        </v-container>
      </v-flex>

      <!-- Bids,offers,trades,status and price movement -->
      <v-flex sm8 class="green">
        aaa
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
      ]
    }
  }
}
</script>

<style>

</style>
