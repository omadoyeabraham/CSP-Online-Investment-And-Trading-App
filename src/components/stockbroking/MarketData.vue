<template>
  <v-container fluid class="pt0">

    <!-- Page title and search -->
    <v-card class="elevation-0 mb0 row d-flex flex-column ml1 mr1"
      style="background: transparent; border: none">
      <v-container fluid class="pl1 pr1 pt2">
        <v-layout row>
          <v-flex xs5 class="d-flex align-items-end">
             <h3 class="csp-light-blue-text font-size-20">Stockbroking - Market Data</h3>
          </v-flex>

          <v-flex xs7 d-flex class="">
            <v-container fluid class="p0">
              <v-layout row class="">
                <v-flex xs6>

                </v-flex>
                <v-flex d-flex xs6 class="">
                  <v-text-field
                    append-icon="search"
                    label="SEARCH"
                    hide-details
                    class="xs4 font-size-11"
                    v-model="search">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <!-- Table -->
    <v-card class="elevation-0 mb10">
      <div class="height-300px " style="overflow-y: scroll"> <!-- Used so the market data table scrolls -->
         <v-data-table
        hide-actions
        v-bind:headers="tableheaders"
        :items="marketData"
        :search="search"
        :loading="loadingDataTable"
        :rows-per-page-items="rowsPerPageItems"
        class="elevation-1 marketDataTable table-striped table-bordered">
        <template slot="headers" scope="props">
          <tr class="bg-csp-light-blue marketDataTableHeader">
            <th>SYMBOL</th>
            <th class="text-right hidden-md-down">P.CLOSE(₦)</th>
            <th class="text-right">OPEN(₦)</th>
            <th class="text-right">HIGH(₦)</th>
            <th class="text-right">LOW(₦)</th>
            <th class="text-right">CUR.PRICE(₦)</th>
            <th class="text-right">CLOSE(₦)</th>
            <th class="text-right">CHANGE(₦)</th>
            <th class="text-right">CHANGE(%)</th>
            <th class="text-right">VOLUME</th>
            <th class="text-right">VALUE(₦)</th>
            <th class="text-center width-80px white--text ">ACTION</th>
          </tr>
        </template>

        <template slot="items" scope="props">
          <tr
             v-bind:class="[{'selectedRow': isSelectedStock(props.item.name)}, 'marketDataTableBody']"
            @click="setSelectedSecurity(props.item.name)" >
            <td class="font-size-10">
              <span class="emulate-link"
                @click="setSelectedSecurity(props.item.name)">{{props.item.name}}
              </span>
            </td>
            <td class="font-size-10 text-right hidden-md-down">{{props.item.previousClose}}</td>
            <td class="font-size-10 text-right">{{props.item.openingPrice}}</td>
            <td class="font-size-10 text-right">{{props.item.highPrice}}</td>
            <td class="font-size-10 text-right">{{props.item.lowPrice}}</td>
            <td class="font-size-10 text-right">{{props.item.currentPrice}}</td>
            <td class="font-size-10 text-right">{{props.item.closingPrice}}</td>
            <td class="font-size-10 text-right">
              <span v-if="props.item.priceChange < 0" class="">
                ({{Math.abs(props.item.priceChange) | currency('',2)}})<i class=" ml4 fa fa-arrow-down red--text"></i>
              </span>
              <span v-else-if="props.item.priceChange > 0" class="">
                {{props.item.priceChange | currency('',2)}}<i class=" ml4 fa fa-arrow-up green--text"></i>
              </span>
              <span v-else class="">
                {{props.item.priceChange | currency('',2)}}<i class=" ml4 fa fa-window-minimize csp-light-blue-text"></i>
              </span>
            </td>
            <td class="font-size-10 text-right">{{props.item.percentChange | currency('',2)}}</td>
            <td class="font-size-10 text-right">{{props.item.quantityTraded | currency('',2)}}</td>
            <td class="font-size-10 text-right">{{props.item.valueTraded | currency('',2)}}</td>
            <td class="font-size-10 text-center width-80px d-flex align-center justify-center" style="padding: 0px; border: 0px">

                <!-- BUY -->
                <v-btn
                  data-toggle="tooltip" data-placement="top" title="BUY" icon class="m0 p0 width-30px height-30px"
                  @click="tradeStock('BUY', props.item.name)">
                  <v-icon class="green--text font-weight-bold font-size-18" >
                    call_received
                  </v-icon>
                </v-btn>

                <!-- SELL -->
               <v-btn
                data-toggle="tooltip" data-placement="top" title="SELL" icon class="m0 p0 width-30px height-30px"
                @click="tradeStock('SELL', props.item.name)">
                <v-icon  class="blue--text font-weight-bold font-size-18" >
                  call_made
                </v-icon>
               </v-btn>

               <!-- WATCH -->
                <v-btn
                  data-toggle="tooltip" data-placement="top" title="WATCHLIST"
                  icon class="m0 p0 width-30px height-30px"
                  @click="watchStock(props.item.name)">
                  <v-icon class="color-csp-blue ml4 fa fa-eye fa-2x btn-icon font-weight-bold font-size-18">
                  </v-icon>
                </v-btn>

            </td>
          </tr>
        </template>
      </v-data-table>
      </div>
    </v-card>

    <!-- Market data snapshot -->
    <market-data-page-snap-shot>

    </market-data-page-snap-shot>

  </v-container>
</template>

<script>
  // The stockbroking service
  import StockbrokingService from '../../services/StockbrokingService';

  import * as mutationTypes from '../../store/mutation-types'

  import MarketDataPageSnapShot from '../stockbroking/trade/MarketDataPageSnapShot'

  import { mapState, mapActions } from 'vuex';

  export default
  {
    beforeCreate () {
      let gettingMarketData = StockbrokingService.getMarketData()

      gettingMarketData.then((response) => {
        let allMarketData = response.data

        allMarketData.forEach((stockData) => {
          let priceChange = stockData.lastTradePrice - stockData.previousClose
          let priceChangePercent = (priceChange / stockData.previousClose) * 100

          stockData.priceChange = priceChange
          stockData.percentChange = priceChangePercent
        })

        // commit the market data to the stockbroking module of our vue store
        this.$store.commit(mutationTypes.SAVE_MARKET_DATA_TO_STORE, response.data)
      }).catch((error) => {
        console.log(error)
      })
    },

    created () {
      this.getUpdatedMarketData = setInterval(this.updateMarketData, 10000)
    },

    beforeDestroy () {
      clearInterval(this.getUpdatedMarketData)
      this.$store.commit(mutationTypes.CLEAR_SECURITY_SELECTED_ON_TRADE_PAGE)
    },

    computed: {
      ...mapState({
        'marketData': (store) => store.stockbroking.marketData,
        'selectedStock': (store) => store.stockbroking.selectedSecurityOnTradePage
      })
    },

    components: {
      MarketDataPageSnapShot
    },

    data () {
      return {
        getUpdatedMarketData: null,
        startDate: '',
        show: true,
        search: '',
        loadingDataTable: false,
        rowsPerPageItems: [15, 20, { text: 'All', value: -1 }],
        pagination: {
          sortBy: 'name'
        },
        tableheaders: [
          { text: 'SYMBOL', value: 'name', align: 'left' },
          { text: 'P.CLOSE(₦)', value: 'stock', align: 'left' },
          { text: 'OPEN(₦)', value: 'orderType', align: 'left' },
          { text: 'HIGH(₦)', value: 'orderTerm', align: 'left' },
          { text: 'LOW(₦)', value: 'priceType', align: 'left' },
          { text: 'CUR.PRICE(₦)', value: 'unitPrice', align: 'left' },
          { text: 'CLOSE(₦)', value: 'quantityReq', align: 'left' },
          { text: 'CHANGE(₦)', value: 'quqntityExec', align: 'left' },
          { text: 'CHANGE(%)', value: 'status', align: 'left' },
          { text: 'VOLUME', value: 'quqntityExec', align: 'left' },
          { text: 'VALUE(₦)', value: 'quqntityExec', align: 'left' },
          { text: 'ACTION', value: 'quqntityExec', align: 'left' }
          // {text: '', value: 'action', align: 'left'}
        ]
      }
    },

    methods: {
      ...mapActions({
        updateMarketData: 'updateMarketData'
      }),

      setSelectedSecurity: function (selectedSecurityName) {
        this.$store.commit(mutationTypes.CLEAR_SECURITY_SELECTED_ON_TRADE_PAGE)

        let componentThis = this
        setTimeout(function () {
          componentThis.$store.commit(mutationTypes.SET_SECURITY_SELECTED_ON_TRADE_PAGE, selectedSecurityName)
        }, 400);
      },

      isSelectedStock: function (name) {
        return (name === this.selectedStock)
      },

      /**
       * Called when a user clicks on the buy/sell btn from the market data
       *
       * @param orderType {string} The type of order intended. (Either a buy or sell)
       * @param instrument {string} The security to be traded
       * */
      tradeStock: function (orderType, instrument) {
        this.$router.push(`/stb/trade/${orderType}/${instrument}`)
      },

      /**
       * Called when a user clicks on the watchlist btn from the market data
       *
       */
      watchStock: function (instrument) {
        this.$router.push(`/stb/watchlist/${instrument}`)
      }

    }

  }
</script>

<style scoped lang="sass">
  .marketDataTable
    margin-bottom: 0px !important

  .marketDataTableHeader,
  .marketDataTableBody
    height: 25px

  .marketDataTableHeader
    th
      padding: 5px 5px !important
      color: #FFFFFF !important
      font-weight: bold
      font-size: 10px

  .marketDataTableBody
    border-bottom: none !important
    &:hover
      background: #CCC !important
      cursor: pointer

  .marketDataTableBody
    td
      padding: 5px 5px !important
      height: 25px
      color: #31708f
    td:last-child
      border-bottom: 0px solid transparent !important
  .btn__content
    padding: 0px !important
  .eemulate-link
    &:hover
      transition: all .2s
      text-decorations: underline
      border-bottom: 2px solid #1a2155
      padding-bottom: 2px
      cursor: pointer
      background: #EEEEEE

  .selectedRow
    background: #b0bed9 !important
    font-weight: bold
</style>
