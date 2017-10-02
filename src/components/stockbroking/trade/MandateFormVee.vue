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
              Cash Available for Trading: {{availableCash | currency('₦') }}
            </span>
          </v-flex>

        </v-layout>
      </v-container>

      <v-container fluid class="pt0">
        <v-layout row>
          <v-form v-model="valid" ref="form" class="w100p">

            <v-layout row class="p20 pt0">
              <!-- Order Type -->
              <v-flex xs6 class="">
                <v-select class="" :label="'Order Type'" :items="orderTypes" v-model="orderType" v-validate="'required'" prepend-icon="work" name="orderType" :rules="orderTypeRules">
                </v-select>
              </v-flex>

              <!-- Price Option -->
              <v-flex xs6 class="">
                <v-select class="" :label="'Price Option'" :items="priceOptions" v-model="priceOption" v-validate="'required'" :rules="priceOptionRules" prepend-icon="bookmark" name="priceOption">
                </v-select>
              </v-flex>

              <!-- Stocks -->
              <v-flex xs12 class="">
                <v-select class="" :label="'Stock'" :items="securityNames" v-model="securityName" :rules="securityNameRules" prepend-icon="map" v-validate="'required'" name="securityName">
                </v-select>
              </v-flex>

              <!-- Order Term -->
              <v-flex xs12 class="font-size-10">
                <v-select class="font-size-10" :label="'Order Term'" :items="tradeOrderTerms" v-model="orderTerm" :rules="orderTermRules" prepend-icon="today" v-validate="'required'" name="orderTerm">
                </v-select>
              </v-flex>

              <!-- Limit Price -->
              <v-flex xs12 class="">
                <v-text-field v-if="isLimitOrder" :label="'Limit Price'" v-model="limitPrice" :rules="limitPriceRules" prepend-icon="remove_shopping_cart" v-validate="'required'" name="limitPrice">
                </v-text-field>
              </v-flex>

              <!-- Quantity -->
              <v-flex xs12 class="">
                <v-text-field :label="'Quantity'" v-model="quantity" :type="'number'" :rules="quantityRules" prepend-icon="add_shopping_cart" v-validate="'required'" name="quantity">
                </v-text-field>
              </v-flex>

            </v-layout>

            <v-layout row>
              <v-flex xs6 class="d-flex justify-end">
                <v-btn primary @click="previewOrder()">
                  Preview Order
                </v-btn>
              </v-flex>

              <v-flex xs6>
                <v-btn error>
                  Cancel Order
                </v-btn>
              </v-flex>
            </v-layout>

          </v-form>

        </v-layout>
      </v-container>

      <!-- Buttons -->
      <!-- <v-container fluid>
        <v-layout row>

          <v-flex xs6 class="d-flex justify-end">
            <v-btn primary @click="previewOrder()">
              Preview Order
            </v-btn>
          </v-flex>

          <v-flex xs6>
            <v-btn error>
              Cancel Order
            </v-btn>
          </v-flex>

        </v-layout>
      </v-container> -->

    </v-card-media>

  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import * as mutationTypes from '../../../store/mutation-types'
import StockbrokingService from '../../../services/StockbrokingService'

export default
{
  props: ['orderType', 'securityName'],
  data () {
    return {
      valid: false,
      // orderType: '',
      orderTerm: '',
      priceOption: '',
      limitPrice: '',
      // securityName: '',
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

    ...mapState({
      'portfolioName': (store) => store.stockbroking.currentPortfolio.name,
      'portfolioLabel': (store) => store.stockbroking.currentPortfolio.label
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
      this.$validator.validateAll().then((result) => {
        // No form errors..Proceed
        if (result) {
          let tradeOrder = {
            orderType: this.orderType,
            priceType: this.priceOption,
            instrument: this.securityName,
            orderTermName: this.orderTerm,
            quantityRequested: this.quantity,
            limitPrice: this.limitPrice,
            orderOrigin: 'WEB',
            orderCurrency: 'NGN',
            portfolioLabel: this.portfolioLabel,
            portfolioName: this.portfolioName
          }
          StockbrokingService.previewTradeOrder(tradeOrder)
        } else { // Validation errors occured
          // Used to display the errors to the user, if the preview btn is pressed
          let formComponents = this.$refs.form.$children
          formComponents.forEach((formComponent) => {
            formComponent.shouldValidate = true
          })

          return
        }
      })
    }
  }

}
</script>

<style>

</style>
