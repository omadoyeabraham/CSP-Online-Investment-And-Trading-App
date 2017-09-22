<!--
  This component handles content under the bonds tab of the portfolio holdings page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
  -->
<template>
  <v-container fluid>

    <v-layout class="mb10">
      <v-flex xs8 offset-xs4 sm6 offset-sm6 lg4 offset-lg8>
        <v-text-field append-icon="search" label="Search Bond Holdings" single-line hide-details v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-data-table v-bind:headers="tableheaders" :items="tradeOrders" :search="search" id="tradeHistoryTable" class="table-striped elevation-1">
      <template slot="headers" scope="props">
        <tr class="bg-csp-light-blue " id="tradeHistoryTableHeader">
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
        <tr id="tradeHistoryTableBody">
          <td class="font-size-10">{{props.item.orderDate}}</td>
          <td class="font-size-10">{{props.item.securityName}}</td>
          <td class="font-size-10">{{props.item.orderType}}</td>
          <td class="font-size-10">{{props.item.orderTermLabel}}</td>
          <td class="font-size-10">{{props.item.priceType}}</td>
          <td class="font-size-10">{{props.item.limitPrice}}</td>
          <td class="font-size-10">{{props.item.quantityRequested}}</td>
          <td class="font-size-10">{{props.item.quantityFilled}}</td>
          <td class="font-size-10">{{props.item.orderStatus}}</td>
        </tr>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
// The stockbroking service
import StockbrokingService from '../../../services/StockbrokingService';

import DatePicker from 'vue-md-date-picker'

import { mapState } from 'vuex';

export default
{
  components: [DatePicker],
  // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
  beforeCreate () {
    StockbrokingService.getTradeOrders();
  },

  data () {
    return {
      startDate: '',
      show: true,
      search: '',
      pagination: {
        sortBy: 'name'
      },
      tableheaders: [
        { text: 'ORDER DATE', value: 'orderDate', align: 'left', sortable: false },
        { text: 'STOCK', value: 'stock', align: 'left' },
        { text: 'TYPE', value: 'orderType', align: 'left' },
        { text: 'ORDER TERM', value: 'orderTerm', align: 'left' },
        { text: 'PRICE TYPE', value: 'priceType', align: 'left' },
        { text: 'UNIT PRICE', value: 'unitPrice', align: 'left' },
        { text: 'QUANTITY REQ', value: 'quantityReq', align: 'left' },
        { text: 'QUANTITY EXEC', value: 'quqntityExec', align: 'left' },
        { text: 'STATUS', value: 'status', align: 'left' }
        // {text: '', value: 'action', align: 'left'}
      ]
    }
  },

  computed: mapState({
    'tradeOrders': (store) => store.stockbroking.tradeOrders
  })

}
</script>

<style scoped lang="sass">

  .form-element > label
    font-size: 10px !important
    color: green

  #tradeHistoryTable
    margin-bottom: 0px !important

  #tradeHistoryTableHeader,
  #tradeHistoryTableBody
    height: 25px

  #tradeHistoryTableHeader
    th
      padding: 0px 5px !important

  #tradeHistoryTableBody
    td
      padding: 5px 5px !important
      height: 25px
</style>
