<!--
  This component represents the form used in placing trade orders to the NSE floor

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-card>

    <v-card-title primary-title class="font-weight-bold p2 d-flex justify-start">
      <h5 class=" pt10 font-weight-bold pl5 mb-0 font-size-12 text-uppercase">Cash Available for Trading:
        {{availableCash | currency('₦') }}
      </h5>
    </v-card-title>

    <v-card-media>

      <v-container fluid class="pt0 pl1 pr1">
        <v-layout row>
          <v-form v-model="valid" ref="form" class="w100p">

            <v-layout row class="pl20 pr20 pt10">

              <!-- Order Type -->
              <v-flex xs6 class="height-55px mb6">
                <v-select class="" :label="'Order Type'" :items="orderTypes" v-model="orderType" v-validate="'required'" name="orderType" :rules="orderTypeRules"
                :disabled="inPreviewState">
                </v-select>
              </v-flex>

              <!-- Stocks -->
              <v-flex xs6 class="height-55px mb6">
                <v-select class=""
                label="Stock" :items="securityNames" v-model="securityName" :rules="securityNameRules" :no-data-text="noStockToSellText" v-validate="'required'" name="securityName" :disabled="inPreviewState" autocomplete clearable>
                </v-select>
              </v-flex>


              <!-- Quantity -->
              <v-flex xs6 class="height-55px mb6">
                <v-text-field :label="'Quantity'" v-model="quantity" :type="'number'" :rules="quantityRules"  v-validate="'required'" name="quantity" :disabled="inPreviewState">
                </v-text-field>
              </v-flex>


              <!-- Quantity Held -->
              <v-flex xs6 v-if="canShowQuantityHeld" class="height-55px mb6">
                <v-text-field :label="'Quantity Held'" :value="quantityHeld | currency('',0)" :type="'text'"   disabled>
                </v-text-field>
              </v-flex>

              <!-- Price Option -->
              <v-flex xs6 class="height-55px mb6">
                <v-select class="" :label="'Price Option'" :items="priceOptions" v-model="priceOption" v-validate="'required'" :rules="priceOptionRules"  name="priceOption" :disabled="inPreviewState">
                </v-select>
              </v-flex>

              <!-- Order Term for Market -->
              <v-flex v-if="isMarketOrder" xs6 class="font-size-10 height-55px mb6">
                <v-text-field  label="Order Term" placeholder="GOOD FOR A DAY"  :type="'text'" name="orderTerm" disabled>
                </v-text-field>
              </v-flex>

              <!-- Order Term for Limit -->
              <v-flex v-if="!isMarketOrder" xs6 class="font-size-10 height-55px mb6">
                <v-select class="font-size-10" :label="'Order Term'" :items="tradeOrderTerms" v-model="orderTerm" :rules="orderTermRules"  v-validate="'required'" name="orderTerm" :disabled="inPreviewState">
                </v-select>
              </v-flex>

              <!-- Limit Price -->
              <v-flex xs6 v-if="isLimitOrder" class="height-55px mb6">
                <!-- When not Previewing -->
                <v-text-field   :label="'Limit Price'" v-model="limitPrice" :type="'number'" :rules="limitPriceRules"  v-validate="'required'" name="limitPrice" :disabled="inPreviewState">
                </v-text-field>
                <!-- When previewing v-if="!inPreviewState" -->
                <!-- <v-text-field v-else  :label="'Limit Price'" :value="limitPrice | currency('',2)" :type="'text'" disabled>
                </v-text-field> -->
              </v-flex>

              <!-- Consideration -->
              <v-flex xs6 v-if="inPreviewState" class="height-55px mb6">
                <!-- <v-text-field  readonly :label="'Consideration'" v-model="orderConsideration" :type="'number'"   :disabled="inPreviewState">
                </v-text-field> -->
                <v-text-field  readonly :label="'Consideration'" :value="orderConsideration | currency('', 2)" :type="'text'"   :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

              <!-- Total Fees -->
              <v-flex xs6 v-if="inPreviewState" class="height-55px mb6">
                <v-text-field :label="'Total Fees'" :value="orderTotalFees | currency('',2)" :type="'text'"  :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

              <!-- Total Estimated Cost / Proceeds -->
              <v-flex xs12 v-if="inPreviewState" class="height-55px mb6">
                <!-- <v-text-field  :label="orderTotalText" v-model="formattedOrderTotal" :type="'text'"  :disabled="inPreviewState">
                </v-text-field> -->
                <v-text-field  :label="orderTotalText" :value="formattedOrderTotal" :type="'text'"  :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

            </v-layout>

            <!-- Loading Icon when previewing mandates -->
            <v-layout v-if="gettingPreviewData"  row class=" d-flex justify-center ">
              <v-flex class="xs6 d-flex justify-center align-center">
                 <!-- <span class="font-size-10">Calculating Order Cost</span> -->
                 <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                 <span class="font-size-12 ml5">Calculating order cost</span>
              </v-flex>
            </v-layout>

            <!-- Loading Icon when placing mandates -->
            <v-layout v-if="placingMandate"  row class=" d-flex justify-center ">
              <v-flex class="xs6 d-flex justify-center align-center">
                 <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                 <span class="font-size-12 ml5">Placing Mandate</span>
              </v-flex>
            </v-layout>

            <v-layout v-if="!placingMandate" row class="mt20">
              <v-flex xs6 class="d-flex justify-end ">
                <v-btn v-if="!inPreviewState" style="background: #4c7396; color: #FFFFFF"
                  @click="previewOrder()">
                  Preview Order
                </v-btn>
                <v-btn v-if="inPreviewState" style="background: #4c7396; color: #FFFFFF" @click="placeOrder()">
                  Submit Order
                </v-btn>
              </v-flex>

              <v-flex xs6>
                <v-btn class="red darken-1 white--text" @click="cancelOrder()">
                  Cancel Order
                </v-btn>
              </v-flex>
            </v-layout>

          </v-form>

          <v-snackbar error
            :timeout="snackbarTimeout"
            :top="true"
            :multi-line="snackbarMode === 'multi-line'"
            :vertical="snackbarMode === 'vertical'"
            :color="'error'"
            v-model="showMandateErrorSnackbar"
            >
            {{ mandateErrorSnackbarText }}
          </v-snackbar>

        </v-layout>
      </v-container>

    </v-card-media>

  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import * as mutationTypes from '../../../store/mutation-types'
import StockbrokingService from '../../../services/StockbrokingService'

export default
{
  props: ['redirectedOrderType', 'redirectedSecurityName'],

  mounted () {
    // Set the selected security, when redirecting from any of the BUY/SELL buttons
    if (this.redirectedOrderType && this.redirectedSecurityName) {
      this.orderType = this.redirectedOrderType
      this.securityName = this.redirectedSecurityName
    }

    this.$store.commit(mutationTypes.SET_SECURITY_SELECTED_ON_TRADE_PAGE, this.securityName)
  },

  data () {
    return {
      showMandateErrorSnackbar: false,
      mandateErrorSnackbarText: null,
      snackbarTimeout: 3000,
      snackbarMode: '',
      mandateErrorSnackbarColor: 'red lighten-2',
      noStockToSellText: 'No stock to sell',
      valid: false,
      orderTerm: '',
      orderType: null,
      securityName: null,
      priceOption: '',
      limitPrice: '',
      quantity: '',
      quantityHeld: '',
      orderConsideration: null,
      orderTotal: null,
      formattedOrderTotal: null,
      orderTotalFees: null,
      orderTotalText: '',
      inPreviewState: false,
      canShowQuantityHeld: false,
      gettingPreviewData: false,
      placingMandate: false,
      orderTypeRules: [
        (v) => !!v || 'Required'
      ],
      orderTypes: [
        { text: 'Buy', value: 'BUY' },
        { text: 'Sell', value: 'SELL' }
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
        { text: 'Market', value: 'MARKET' },
        { text: 'Limit', value: 'LIMIT' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      'tradeOrderTerms': 'getTradeOrderTerms',
      'allSecurityNames': 'getSecurityNames',
      'currentPortfolioSecurityNames': 'getAllSecuritiesInCurrentPortfolio',
      'currentPortfolioHoldings': 'getStockPortfolioHoldings',
      'availableCash': 'currentPortfolioAvailableCash'
    }),

    ...mapState({
      'portfolioName': (store) => store.stockbroking.currentPortfolio.name,
      'portfolioLabel': (store) => store.stockbroking.currentPortfolio.label,
      'selectedSecurityStatusInfo': (store) => store.stockbroking.selectedSecurityStatusInfo
    }),

    isLimitOrder: function () {
      return this.priceOption === 'LIMIT'
    },

    isMarketOrder: function () {
      return this.priceOption === 'MARKET'
    },

    securityNames: function () {
      if (this.orderType === 'SELL') {
        return this.currentPortfolioSecurityNames
      } else if (this.orderType === 'BUY') {
        return this.allSecurityNames
      } else {
        return []
      }
    }

  },

  watch: {
    securityName: function (selectedSecurityName) {
      this.$store.commit(mutationTypes.SET_SECURITY_SELECTED_ON_TRADE_PAGE, selectedSecurityName)

      // Check to see if the current portfolio has the currently selected security name
      let currentSecurity = this.currentPortfolioHoldings.find((portfolioHolding) => {
        return portfolioHolding.securityName === this.securityName
      })

      // If the portfolio has the security, set this.quantityHeld
      if (currentSecurity !== undefined) {
        this.quantityHeld = currentSecurity.quantityHeld
        this.canShowQuantityHeld = true
      } else {
        // the portfolio does not have the selected security
        this.quantityHeld = ''
        this.canShowQuantityHeld = false
      }
    }
  },

  methods: {
    /**
     * Preview a mandate before sending it out
     *
     */
    previewOrder: function () {
      this.$validator.validateAll().then((result) => {
        // Form is being validated

        // Show the loading icon for previewing
        this.gettingPreviewData = true

        // Ensure that the order term for market orders is good for a day
        let orderTerm = ''
        if (this.isMarketOrder) {
          orderTerm = '0000000000'
        } else {
          orderTerm = this.orderTerm
        }

        if (result) {
          let tradeOrder = {
            orderType: this.orderType,
            priceType: this.priceOption,
            instrument: this.securityName,
            orderTermName: orderTerm,
            quantityRequested: this.quantity,
            limitPrice: this.limitPrice,
            orderOrigin: 'WEB',
            orderCurrency: 'NGN',
            portfolioLabel: this.portfolioLabel,
            portfolioName: this.portfolioName
          }

          /**
           * Api call which returns a promise. The resolved data will return either be a fault string
           * or an object with the amount(consideration + fees) and currency of the tradeorder
           */
          let getTradeOrderTotal = StockbrokingService.previewTradeOrder(tradeOrder)

          getTradeOrderTotal.then((response) => {
            let responseData = response.data

            // An appropriate value was returned for the getTradeOrderTotal request
            if (responseData.amount) {
              // Get the order's total amount as returned from the API call
              let orderTotal = Number(parseFloat(responseData.amount).toFixed(2))
              this.orderTotal = orderTotal

              // Format negative order totals properly
              if (orderTotal < 0) {
                let absoluteOrderTotal = Math.abs(orderTotal)
                orderTotal = absoluteOrderTotal.toLocaleString()
                orderTotal = `(${absoluteOrderTotal})`
              } else {
                orderTotal = orderTotal.toLocaleString('en-IN')
              }

              this.formattedOrderTotal = orderTotal

              // calculate the total consideration for the order
              this.calculateConsideration()

              // Calculate the total fees for this order
              this.calculateTotalFees()

              // get the text used in the orderTotal input displayed after previewing
              this.getOrderTotalDescription()

              this.inPreviewState = true

              // Hide the loading icon for previewing
              this.gettingPreviewData = false
            } else {
              // An error string was returned in response to the getTradeOrderTotal request
              console.log(responseData)

              // Handle mandate errors here
              this.mandateErrorSnackbarText = responseData.status
              this.showMandateErrorSnackbar = true

              // Hide the loading icon for previewing
              this.gettingPreviewData = false
            }
          }).catch((error) => {
            // Handle errors here
            console.log(error)

            // Hide the loading icon for previewing
            this.gettingPreviewData = false
          })
        } else { // Validation errors occured
          // Used to display the errors to the user, if the preview btn is pressed
          let formComponents = this.$refs.form.$children
          formComponents.forEach((formComponent) => {
            formComponent.shouldValidate = true
          })

          // Hide the loading icon for previewing
          this.gettingPreviewData = false

          return
        }
      })
    },

    /**
     * Place a mandate, after successfully previewing the mandate
     *
     */
    placeOrder: function () {
      // Show the loading icon for placing mandates
      this.placingMandate = true

      // Ensure that the order term for market orders is good for a day
      let orderTerm = ''
      if (this.isMarketOrder) {
        orderTerm = '0000000000'
      } else {
        orderTerm = this.orderTerm
      }

      // Get the tradeOrder object
      let tradeOrder = {
        orderType: this.orderType,
        priceType: this.priceOption,
        instrument: this.securityName,
        orderTermName: orderTerm,
        quantityRequested: this.quantity,
        limitPrice: this.limitPrice,
        orderOrigin: 'WEB',
        orderCurrency: 'NGN',
        portfolioLabel: this.portfolioLabel,
        portfolioName: this.portfolioName
      }

      /**
       * Api call which returns a promise. This call is used to place the mandate on the floor of the * NSE
       */
      let placeTradeOrder = StockbrokingService.createTradeOrder(tradeOrder)

      placeTradeOrder.then((response) => {
        // Hide the loading icon for placing mandates
        this.placingMandate = false

        // Set and show the mandate placed message on the trade history page
        this.$store.commit(mutationTypes.SET_MANDATE_PLACEMENT_STATE, true)

        // Redirect to the trade history page
        this.$router.push({name: 'stb-trade-history-ignore-check'})
      }).catch((error) => {
        console.log(`error while placing mandates`)
        console.log(error)
      })
    },

    /**
     * Calculate the consideration for the trade order being previewed
     */
    calculateConsideration: function () {
      // For limit orders
      if (this.priceOption === 'LIMIT') {
        let consideration = parseFloat(this.limitPrice) * parseFloat(this.quantity)
        this.orderConsideration = consideration.toFixed(2)
      } else {
        // For market Orders
        const lastTradedPrice = parseFloat(this.selectedSecurityStatusInfo.lastPrice)
        const percentageOfLastTradedPrice = (10 / 100) * lastTradedPrice

        let consideration = (this.quantity) * (lastTradedPrice + percentageOfLastTradedPrice)
        this.orderConsideration = consideration.toFixed(2)
      }
    },

    /**
     * Calculate the total fees for the trade order being previewed
     */
    calculateTotalFees: function () {
      let totalFees = 0
      // Buy orders
      if (this.orderType === 'BUY') {
        totalFees = this.orderTotal - this.orderConsideration
      } else {
        // Sell orders
        totalFees = this.orderConsideration - this.orderTotal
      }

      totalFees = totalFees.toFixed(2)

      this.orderTotalFees = totalFees
    },

    /**
     * Return the text description for the order being previewed
     */
    getOrderTotalDescription: function () {
      if (this.orderType === 'BUY') {
        this.orderTotalText = 'Total Estimated Cost'
      } else {
        this.orderTotalText = 'Total Estimated Proceeds'
      }
    },

    /**
     * Cancel the current order being worked on and reset all input fields
     */
    cancelOrder: function () {
      this.orderType = null
      this.priceOption = null
      this.securityName = null
      this.orderTerm = null
      this.limitPrice = null
      this.quantity = null
      this.inPreviewState = false
    }
  }

}
</script>

<style>

</style>
