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
                    label="Search Market Data"
                    hide-details
                    class="xs4"
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
        id="marketDataTable"
        class="table-striped elevation-1">
        <template slot="headers" scope="props">
          <tr class="bg-csp-light-blue " id="marketDataTableHeader">
            <th v-for="header in props.headers" :key="header.text" :class="['column sortable', 'white--text',
                              pagination.descending ? 'desc' : 'asc',
                              header.value === pagination.sortBy ? 'active' : ''
                              ]" @click="changeSort(header.value)">
              <!-- <v-icon>arrow_upward</v-icon> -->
              {{ header.text }}
            </th>
          </tr>
        </template>

        <template slot="items" scope="props">
          <tr id="marketDataTableBody">
            <td class="font-size-10">
              <span class="emulate-link"
                @click="setSelectedSecurity(props.item.name)">{{props.item.name}}
              </span>
            </td>
            <td class="font-size-10">{{props.item.previousClose}}</td>
            <td class="font-size-10">{{props.item.openingPrice}}</td>
            <td class="font-size-10">{{props.item.highPrice}}</td>
            <td class="font-size-10">{{props.item.lowPrice}}</td>
            <td class="font-size-10">{{props.item.currentPrice}}</td>
            <td class="font-size-10">{{props.item.closingPrice}}</td>
            <td class="font-size-10">
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
            <td class="font-size-10">{{props.item.percentChange | currency('',2)}}</td>
            <td class="font-size-10">{{props.item.quantityTraded | currency('',2)}}</td>
            <td class="font-size-10">{{props.item.valueTraded | currency('',2)}}</td>
            <td class="font-size-10">
              <button class="button button-blue-csp elevation-2 mb2"
                 @click="tradeStock('buy', props.item.name)">
                BUY
              </button>
              <button class="button button-blue-csp elevation-2 mb2"
                 @click="tradeStock('sell', props.item.name)">
                SELL
              </button>
              <button class="button button-blue-csp elevation-2">
                WATCH
              </button>
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

  import { mapState } from 'vuex';

  export default
  {
    beforeCreate () {
      StockbrokingService.getMarketData();
    },

    computed: mapState({
      'marketData': (store) => store.stockbroking.marketData
    }),

    components: {
      MarketDataPageSnapShot
    },

    data () {
      return {
        startDate: '',
        show: true,
        search: '',
        loadingDataTable: false,
        rowsPerPageItems: [15, 20, { text: 'All', value: -1 }],
        pagination: {
          sortBy: 'name'
        },
        tableheaders: [
          { text: 'SYMBOL', value: 'orderDate', align: 'left', sortable: true },
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
      setSelectedSecurity: function (selectedSecurityName) {
        this.$store.commit(mutationTypes.SET_SECURITY_SELECTED_ON_TRADE_PAGE, selectedSecurityName)
      },

      /**
       * Called when a user clicks on the buy/sell btn from the portfolio holdings
       *
       * @param orderType {string} The type of order intended. (Either a buy or sell)
       * @param instrument {string} The security to be traded
       * */
      tradeStock: function (orderType, instrument) {
        this.$router.push(`/stb/trade/${orderType}/${instrument}`)
      }

    }

  }
</script>

<style scoped lang="sass">
  #marketDataTable
    margin-bottom: 0px !important

  #marketDataTableHeader,
  #marketDataTableBody
    height: 25px

  #marketDataTableHeader
    th
      padding: 0px 5px !important

  #marketDataTableBody
    td
      padding: 5px 5px !important
      height: 25px
  .btn__content
    padding: 0px !important
  .emulate-link
    &:hover
      transition: all .2s
      text-decorations: underline
      border-bottom: 2px solid #1a2155
      padding-bottom: 2px
      cursor: pointer
      background: #EEEEEE
</style>
