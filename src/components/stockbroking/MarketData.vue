<template>
  <v-container fluid>

    <v-card class="elevation-0 mb0 row d-flex flex-column ml1 mr1">
      <v-container fluid class="pl1 pr1">
        <v-layout row>
          <v-flex xs5 class="d-flex align-items-end">
             <h3 class="blue--text text--darken-4">Stockbroking - Market Data</h3>
          </v-flex>

          <v-flex xs7 d-flex class="">
            <v-container fluid class="p0">
              <v-layout row>
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

    <v-card class="elevation-0">
      <v-data-table
        v-bind:headers="tableheaders"
        :items="marketData"
        :search="search"
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
            <td class="font-size-10">{{props.item.name}}</td>
            <td class="font-size-10">{{props.item.previousClose}}</td>
            <td class="font-size-10">{{props.item.openingPrice}}</td>
            <td class="font-size-10">{{props.item.highPrice}}</td>
            <td class="font-size-10">{{props.item.lowPrice}}</td>
            <td class="font-size-10">{{props.item.currentPrice}}</td>
            <td class="font-size-10">{{props.item.closingPrice}}</td>
            <td class="font-size-10">{{props.item.priceChange}}</td>
            <td class="font-size-10">{{props.item.percentChange}}</td>
            <td class="font-size-10">{{props.item.quantityTraded}}</td>
            <td class="font-size-10">{{props.item.valueTraded}}</td>
            <td class="font-size-10">
              <button class="button button-blue-csp elevation-2 mb2">
                BUY
              </button>
              <button class="button button-blue-csp elevation-2 mb2">
                SELL
              </button>
              <button class="button button-blue-csp elevation-2">
                WATCH
              </button>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

  </v-container>
</template>

<script>
  // The stockbroking service
  import StockbrokingService from '../../services/StockbrokingService';

  import { mapState } from 'vuex';

  export default
  {
    beforeCreate () {
      StockbrokingService.getMarketData();
    },

    computed: mapState({
      'marketData': (store) => store.stockbroking.marketData
    }),

    data () {
      return {
        startDate: '',
        show: true,
        search: '',
        pagination: {
          sortBy: 'name'
        },
        tableheaders: [
          { text: 'SYMBOL', value: 'orderDate', align: 'left', sortable: false },
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
</style>
