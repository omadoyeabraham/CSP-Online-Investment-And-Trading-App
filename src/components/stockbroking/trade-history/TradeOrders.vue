<template>
  <v-container fluid class="p0">

    <v-data-table
      v-bind:headers="tableheaders"
      :items="orders"
      :search="search"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      :no-data-text="noDataText"
      hide-actions
      class="table-striped elevation-1 tradeHistoryTable">
      <template slot="headers" scope="props">
        <tr class="bg-csp-light-blue tradeHistoryTableHeader" >
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
        <tr class="tradeHistoryTableBody">
          <td class="font-size-10 p5">{{props.item.orderDate | moment("DD-MMM-YYYY")}}</td>
          <td class="font-size-10 p5">{{props.item.securityName}}</td>
          <td class="font-size-10 p5">{{props.item.orderType}}</td>
          <td class="font-size-10 p5">{{props.item.orderTermLabel}}</td>
          <td class="font-size-10 p5">{{props.item.priceType}}</td>
          <td class="font-size-10 p5 ">
            <span v-if="props.item.limitPrice">{{props.item.limitPrice}}</span>
            <span v-else>---</span>
          </td>
          <td class="font-size-10 p5">{{props.item.quantityRequested | currency('', 2)}}</td>
          <td class="font-size-10 p5">{{props.item.quantityFilled | currency('',2)}}</td>
          <td class="font-size-10 p5">{{props.item.fixOrderStatus}}</td>
          <td>
            <span></span>
          </td>
        </tr>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
  export default
  {
    props: ['orders'],

    data () {
      return {
        search: '',
        pagination: {
          sortBy: 'orderDate',
          descending: false
        },
        loading: false,
        noDataText: 'No Trade Orders',
        rowsPerPageItems: [10, 15, 20, { text: 'All', value: -1 }],
        tableheaders: [
          { text: 'ORDER DATE', value: 'orderDate', align: 'left', sortable: false },
          { text: 'STOCK', value: 'stock', align: 'left' },
          { text: 'TYPE', value: 'orderType', align: 'left' },
          { text: 'ORDER TERM', value: 'orderTerm', align: 'left' },
          { text: 'PRICE TYPE', value: 'priceType', align: 'left' },
          { text: 'UNIT PRICE', value: 'unitPrice', align: 'right' },
          { text: 'QUANTITY REQ', value: 'quantityReq', align: 'left' },
          { text: 'QUANTITY EXEC', value: 'quantityExec', align: 'left' },
          { text: 'STATUS', value: 'status', align: 'left' },
          {text: '', value: 'action', align: 'left'}
        ]
      }
    }
  }
</script>

<style scoped lang="sass">

  .tradeHistoryTable
    margin-bottom: 0px !important

  .tradeHistoryTableHeader,
  .tradeHistoryTableBody
    height: 25px


  .tradeHistoryTableHeader
    th
      padding: 0px 5px !important

  tr.tradeHistoryTableBody
    td
      padding: 5px 5px !important
      height: 25px
</style>
