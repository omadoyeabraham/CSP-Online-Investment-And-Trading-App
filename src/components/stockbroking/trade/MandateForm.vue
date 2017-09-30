<template>

  <v-card>

    <v-card-title primary-title class="blue darken-4 white--text p2 d-flex justify-center">
      <h5 class="headline mb-0 font-size-16">PLACE A MANDATE</h5>
    </v-card-title>

    <v-card-media>

       <v-container fluid class="p0 pt2">
        <v-layout row>

          <v-flex sm12 class="blue-grey darken-1 p5 white--text">
            <span class="font-size-12 font-weight-bold p15">
              Cash Available for Trading:  {{availableCash | currency('₦') }}
            </span>
          </v-flex>

        </v-layout>
      </v-container>

      <v-container fluid class="pt0">
        <v-layout row>
          <v-form v-model="mandatePreviewFormIsValid" ref="mandatePreviewForm"
            class="w100p">
        <v-layout row class="p20 pt0">
          <!-- Order Type -->
          <v-flex sm6 class="">
              <v-select
                class=""
                :label="'Order Type'"
                :items="orderTypes"
                v-model="orderType"
                :rules="orderTypeRules"
                prepend-icon="work"
                >
              </v-select>
          </v-flex>

          <!-- Price Option -->
          <v-flex sm6 class="">
              <v-select
                class=""
                :label="'Price Option'"
                :items="priceOptions"
                v-model="priceOption"
                :rules="priceOptionRules"
                prepend-icon="bookmark"
                >
              </v-select>
          </v-flex>

          <!-- Stocks -->
          <v-flex sm12 class="">
              <v-select
                class=""
                :label="'Stock'"
                :items="securityNames"
                v-model="securityName"
                :rules="securityNameRules"
                prepend-icon="map"
                >
              </v-select>
          </v-flex>

          <!-- Order Term -->
          <v-flex sm12 class="font-size-10">
              <v-select
                class="font-size-10"
                :label="'Order Term'"
                :items="tradeOrderTerms"
                v-model="orderTerm"
                :rules="orderTermRules"
                prepend-icon="today"
                >
              </v-select>
          </v-flex>

          <!-- Limit Price -->
          <v-flex
          sm12 class="">
              <v-text-field
                v-if="isLimitOrder"
                :label="'Limit Price'"
                v-model="limitPrice"
                :rules="limitPriceRules"
                prepend-icon="remove_shopping_cart"
                >
              </v-text-field>
          </v-flex>

          <!-- Quantity -->
          <v-flex
          sm12 class="">
              <v-text-field
                :label="'Quantity'"
                v-model="quantity"
                :type="'number'"
                :rules="quantityRules"
                 prepend-icon="add_shopping_cart"
                >
              </v-text-field>
          </v-flex>
           </v-layout>
          </v-form>

        </v-layout>
      </v-container>

      <!-- Buttons -->
      <v-container fluid>
        <v-layout row>

          <v-flex xs6
            class="d-flex justify-end">
            <v-btn primary
              @click="previewOrder()">
              Preview Order
            </v-btn>
          </v-flex>

          <v-flex xs6>
            <v-btn error>
              Cancel Order
            </v-btn>
          </v-flex>

        </v-layout>
      </v-container>

    </v-card-media>

  </v-card>


</template>

<script>
import {mapGetters} from 'vuex'

import * as mutationTypes from '../../../store/mutation-types'
import StockbrokingService from '../../../services/StockbrokingService'

export default
{
  data () {
    return {
      mandatePreviewFormIsValid: false,
      orderType: '',
      orderTerm: '',
      priceOption: '',
      limitPrice: '',
      securityName: '',
      quantity: '',
      orderTypeRules: [
        (v) => !!v || 'Required'
      ],
      orderTypes: [
        { text: 'Buy', value: 'buy' },
        { text: 'Sell', value: 'sell' }
      ],
      orderTermRules: [
        (v) => !!v || 'Required'
      ],
      limitPriceRules: [
        (v) => !!v || 'Required'
      ],
      priceOptionRules: [
        (v) => !!v || 'Required'
      ],
      securityNameRules: [
        (v) => !!v || 'Required'
      ],
      quantityRules: [
        (v) => !!v || 'Required',
        (v) => (v % 1) === 0 || 'Whole number required'
      ],
      priceOptions: [
        { text: 'Market', value: 'market' },
        { text: 'Limit', value: 'limit' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      'tradeOrderTerms': 'getTradeOrderTerms',
      'allSecurityNames': 'getSecurityNames',
      'currentPortfolioSecurityNames': 'getAllSecuritiesInCurrentPortfolio',
      'availableCash': 'currentPortfolioAvailableCash'
    }),

    isLimitOrder: function () {
      return this.priceOption === 'limit'
    },

    securityNames: function () {
      if (this.orderType === 'sell') {
        return this.currentPortfolioSecurityNames
      } else if (this.orderType === 'buy') {
        return this.allSecurityNames
      } else {
        return []
      }
    }

  },

  watch: {
    securityName: function (selectedSecurityName) {
      this.$store.commit(mutationTypes.SET_SECURITY_SELECTED_ON_TRADE_PAGE, selectedSecurityName)
    }
  },

  methods: {
    // Preview a mandate before sending it out
    previewOrder: function () {
      if (!this.$refs.mandatePreviewForm.validate()) {
        console.log(this.$refs.mandatePreviewForm.validate())
        console.log('before')
        return
      }
      StockbrokingService.previewTradeOrder({})
    }
  }

}
</script>

<style>

</style>
