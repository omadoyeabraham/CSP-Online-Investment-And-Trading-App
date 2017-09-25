<!--
  Shows the client's stockbroking trade history

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

    <v-layout row>
      <v-flex row class="green align-items-center">
        <span class="ml10">Showing Trade orders from 01-AUG-2017 to 16-SEPT-2017</span>
      </v-flex>

      <v-flex row class="red align-items-center justify-content-end">
        <span class="mr20">Specify date range</span>
        <v-form class="d-flex">

          <!-- Start Date -->
           <v-menu
            lazy
            :close-on-content-click="false"
            v-model="startDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
            >
            <v-text-field
              slot="activator"
              label="Start Date"
              v-model="startDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="startDate" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
           </v-menu>
          <!-- EOF Start Date -->

          <!-- End Date -->
           <v-menu
            lazy
            :close-on-content-click="false"
            v-model="endDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
            >
            <v-text-field
              slot="activator"
              label="End Date"
              v-model="endDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="endDate" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
           </v-menu>
          <!-- EOF End Date -->

        </v-form>
      </v-flex>
    </v-layout>

    <v-layout class="mb10">
      <v-flex xs8 offset-xs4 sm6 offset-sm6 lg4 offset-lg8>
        <v-text-field
          append-icon="search"
          label="Search Trade History"
          single-line
          hide-details
          v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-data-table
    v-bind:headers="tableheaders"
    :items="tradeOrders"
    :search="search"
    id="tradeHistoryTable"
    class="table-striped elevation-1"
    >
      <template slot="headers" scope="props">
        <tr class="bg-csp-light-blue " id="tradeHistoryTableHeader">
          <th v-for="header in props.headers" :key="header.text"
          :class="['column sortable', 'white--text',
                  pagination.descending ? 'desc' : 'asc',
                  header.value === pagination.sortBy ? 'active' : ''
                  ]"
          @click="changeSort(header.value)">
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
  import StockbrokingService from '../../services/StockbrokingService';

  import DatePicker from 'vue-md-date-picker'

  import {mapState} from 'vuex';

  export default
  {
    components: [DatePicker],
    // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
    beforeCreate () {
      StockbrokingService.getTradeOrders(0);
    },

    data () {
      return {
        startDateMenu: false,
        startDate: null,
        endDateMenu: false,
        endDate: null,
        show: true,
        search: '',
        pagination: {
          sortBy: 'name'
        },
        tableheaders: [
          {text: 'ORDER DATE', value: 'orderDate', align: 'left', sortable: false},
          {text: 'STOCK', value: 'stock', align: 'left'},
          {text: 'TYPE', value: 'orderType', align: 'left'},
          {text: 'ORDER TERM', value: 'orderTerm', align: 'left'},
          {text: 'PRICE TYPE', value: 'priceType', align: 'left'},
          {text: 'UNIT PRICE', value: 'unitPrice', align: 'left'},
          {text: 'QUANTITY REQ', value: 'quantityReq', align: 'left'},
          {text: 'QUANTITY EXEC', value: 'quqntityExec', align: 'left'},
          {text: 'STATUS', value: 'status', align: 'left'}
          // {text: '', value: 'action', align: 'left'}
        ]
      }
    },

    computed: mapState({
      'tradeOrders': (store) => store.stockbroking.tradeOrders,
      'user': (store) => store.user
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
