<!--
  Component used to add a watchlist
-->
<template>

  <v-container fluid class="p0">
    <v-layout row class="">
      <v-card class="white w100p lighten-2 card h-100 min-height-250px " dark>

        <div class="w100p bg-csp-light-blue p10">
          <div class="text-uppercase">ADD WATCHLIST</div>
        </div>

        <!-- Card body -->
        <div class="card-block pl0 pr1">

          <v-container fluid class="p0">
            <v-layout row>
              <!-- Form to add a watchlist -->
              <v-flex xs7 class="">
                <v-form v-model="valid" ref="form" class="w100p pl5">

                  <!-- Stocks -->
                  <v-flex xs12 class="height-55px mb6">
                    <v-select class="" :label="'Stock'" :items="securityNames" v-model="securityName" :rules="securityNameRules"  v-validate="'required'" name="securityName">
                    </v-select>
                  </v-flex>

                <!-- Conditions -->
                <v-flex xs12 class="height-55px mb6">
                  <v-select class="" :label="'Condition'" :items="conditions" v-model="condition" v-validate="'required'" :rules="conditionRules"  name="condition" >
                  </v-select>
                </v-flex>

                <!-- Price -->
                <v-flex xs12  class="height-55px mb6">
                  <v-text-field  :label="'Price'" v-model="price" :rules="priceRules" :type="'number'"  v-validate="'required'" name="price" >
                  </v-text-field>
                </v-flex>

                <!-- Buttons -->
                <v-container fluid class="p0 ">
                  <v-layout  row class="mt20">
                    <v-flex xs6 class="d-flex justify-end ">
                      <v-btn small style="background: #4c7396; color: #FFFFFF"
                        @click="createWatchList()">
                        ADD
                      </v-btn>
                    </v-flex>

                    <v-flex xs6>
                      <v-btn small class="red darken-1 white--text"
                        @click="cancelWatchListForm">
                        CANCEL
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>

                </v-form>
              </v-flex>

              <!-- Display details of the security selected by the user -->
              <v-flex xs5 class="">
                <v-card class="" v-if="securityIsSelected">
                  <!-- <v-card-title primary-title class="bg-csp-light-blue white--text p0 pl20">
                    <h5 class="headline mb-0 font-size-12">
                      MARKET DATA
                      <span v-if="securityIsSelected">FOR {{securityName}}</span>
                    </h5>
                  </v-card-title> -->
                  <v-card-media>
                    <v-container fluid class="p0">
                      <v-layout row
                          class="d-flex justify-between align-between pt5 pb5 ">

                        <!-- <v-flex
                          v-if="!securityIsSelected"
                          class=" ml5 mt10 text-center">
                          No Stock Selected
                        </v-flex> -->

                        <v-flex v-if="securityIsSelected">
                          <ul class="pl0 list-group" id="securityStatusList">
                            <li class="p10">
                              <span class="left">CURRENT PRICE (&#8358;):</span>
                              <span class="right">{{selectedSecurityStatusInfo.lastPrice | currency('',2)}}</span>
                            </li>
                            <li class="p10">
                              <span class="left">PRICE CHANGE (&#8358;):</span>
                              <span class="right">{{selectedSecurityStatusInfo.todaysChange| currency('',2)}}</span>
                            </li>
                            <li class="p10">
                              <span class="left">Price Change (%):</span>
                              <span class="right">{{selectedSecurityStatusInfo.todaysChangeP| currency('',2)}}</span>
                            </li>
                            <li class="p10">
                              <span class="left">OPEN PRICE (&#8358;):</span>
                              <span class="right">{{selectedSecurityStatusInfo.todaysOpen| currency('',2)}}</span>
                            </li>
                            <!-- <li class="p5">
                              <span class="left">CLOSE PRICE (&#8358;)</span>
                              <span class="right">{{selectedSecurityStatusInfo.todaysOpen}}</span>
                            </li> -->
                            <!-- <li class="">
                              <span class="left">High Price</span>
                              <span class="right">{{selectedSecurityStatusInfo.todaysHigh}}</span>
                            </li>
                            <li class="">
                              <span class="left">Low Price</span>
                              <span class="right">{{selectedSecurityStatusInfo.todaysLow}}</span>
                            </li> -->
                            <!-- <li class="">
                              <span class="left">Volume Traded</span>
                              <span class="right">{{selectedSecurityStatusInfo.volume | currency('',0)}}</span>
                            </li>
                            <li class="">
                              <span class="left">Value Traded</span>
                              <span class="right">{{selectedSecurityStatusInfo.lastPrice}}</span> -->
                            <!-- </li> -->
                          </ul>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-media>
                </v-card>
              </v-flex>

            </v-layout>
          </v-container>

        </div>

      </v-card>
    </v-layout>
  </v-container>

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import StockbrokingService from '../../../services/StockbrokingService'
import WatchListService from '../../../services/WatchListService'

export default
{
  props: ['user', 'redirectedInstrument'],

  mounted () {
     // Set the selected security, when redirecting from the watchlist btn
    if (this.redirectedInstrument) {
      this.securityName = this.redirectedInstrument
    }
  },

  data () {
    return {
      valid: false,
      securityIsSelected: false,
      creatingWatchList: false,
      securityName: null,
      condition: '',
      price: '',
      securityNameRules: [
        (v) => !!v || 'Required'
      ],
      conditionRules: [
        (v) => !!v || 'Required'
      ],
      priceRules: [
        (v) => !!v || 'Required'
      ],
      conditions: [
        { text: 'LESS THAN OR EQUAL TO', value: '<=' },
        { text: 'GREATER THAN OR EQUAL TO', value: '>=' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      'allSecurityNames': 'getSecurityNames',
      'allSecurities': 'getSecurityNames'
    }),

    ...mapState({
      'selectedSecurityStatusInfo': (store) => store.stockbroking.selectedSecurityStatusInfo
    }),

    securityNames: function () {
      return this.allSecurityNames
    }
  },

  watch: {
    securityName: function (newlySelectedStock) {
      if ((newlySelectedStock !== '') && (newlySelectedStock !== null)) {
        this.securityIsSelected = true
      } else {
        this.securityIsSelected = false

        // Used so the form inputs are not validated and consequently show errors when the form is cleared
        let formComponents = this.$refs.form.$children
        formComponents.forEach((formComponent) => {
          formComponent.shouldValidate = false
          console.log('Watching')
        })
        return
      }

      let selectedStockObject = this.allSecurities.find(function (security) {
        return security.value === newlySelectedStock
      })

      let selectedStockID = (selectedStockObject) ? parseFloat(selectedStockObject.id) : 1

      StockbrokingService.getSecurityMarketSnapShot(newlySelectedStock)
      StockbrokingService.getSecurityStatusInfo(selectedStockID)
    }
  },

  methods: {
    createWatchList: function () {
      this.$validator.validateAll().then((result) => {
        // Validation errors occured
        if (!result) {
          // Used to display the errors to the user, if the preview btn is pressed
          let formComponents = this.$refs.form.$children

          formComponents.forEach((formComponent) => {
            formComponent.shouldValidate = true
          })
        } else {
          // No validation errors

          // used to toggle visual feedack given to the user
          this.creatingWatchList = true

          let newWatchListItem = {
            customerId: this.user.info.id,
            securityName: this.securityName,
            price: this.price,
            condition: this.condition
          }

          let createWatchListItem = WatchListService.createWatchList(newWatchListItem)

          createWatchListItem.then((response) => {
            // The watchlist was successfully created

            // Show the snackbar with the success message
            this.$parent.showWatchlistCreatedSnackbar = true

            // Refresh the watchlist items to reflect the newly added watchlist
            this.$parent.retreiveUpdatedWatchListData()

            // Used so the form inputs are not validated and consequently show errors when the form is cleared
            let formComponents = this.$refs.form.$children
            formComponents.forEach((formComponent) => {
              formComponent.shouldValidate = false
            })

            // Clear the add watchlist form
            this.securityName = ''
            this.condition = ''
            this.price = ''
          }).catch((error) => {
            console.log(error)
          })

          this.creatingWatchList = false
        }
      })
    },

    cancelWatchListForm: function () {
      this.securityName = ''
      this.condition = ''
      this.price = ''
    }
  }
}
</script>

<style scoped lang="sass">
  .box-header
    border-bottom: 2px solid #EEEEEE
  .alternate
    > div:nth-child(even)
      background: #EEE
  #securityStatusList
    li:nth-child(even)
      background: white
      border-bottom: 1px solid #EEE
    li:nth-child(odd)
      border-bottom: 1px solid #EEE
    li:last-child
      border-bottom: none
    li
      font-size: 12px
      padding-top: 2px
      padding-bottom: 2px
      span.left
        margin-left: 10px
        *font-weight: bold
      span.right
        margin-right: 10px
</style>
