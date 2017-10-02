<template>
  <v-container fluid class="p0">

    <v-data-table
      v-bind:headers="tableheaders"
      :items="orders"
      :search="search"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      :no-data-text="noDataText"
      id="tradeHistoryTable"
      class="table-striped elevation-1">
      <template slot="headers" scope="props">
        <tr class="bg-csp-light-blue " id="tradeHistoryTableHeader">
          <th v-for="header in props.headers" :key="header.text" :class="['column sortable', 'white--text',
                      header.value === pagination.sortBy ? 'active' : ''
                      ]">
            <!-- <v-icon>arrow_upward</v-icon> -->
            {{ header.text }}
          </th>
        </tr>
      </template>

      <template slot="items" scope="props">
        <tr id="tradeHistoryTableBody">
          <td class="font-size-10">{{props.item.orderDate | moment("DD-MMM-YYYY")}}</td>
          <td class="font-size-10">{{props.item.securityName}}</td>
          <td class="font-size-10">{{props.item.orderType}}</td>
          <td class="font-size-10">{{props.item.orderTermLabel}}</td>
          <td class="font-size-10">{{props.item.priceType}}</td>
          <td class="font-size-10">{{props.item.limitPrice}}</td>
          <td class="font-size-10">{{props.item.quantityRequested | currency('', 2)}}</td>
          <td class="font-size-10">{{props.item.quantityFilled | currency('',2)}}</td>
          <td class="font-size-10">{{props.item.fixOrderStatus}}</td>
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
        totalItems: 0,
        pagination: {
          sync: {
            sortBy: 'orderDate',
            descending: true
          }
        },
        loading: false,
        noDataText: 'No Trade Orders',
        rowsPerPageItems: [10, 15, 20, { text: 'All', value: -1 }],
        tableheaders: [
          { text: 'ORDER DATE', value: 'orderDate', align: 'left' },
          { text: 'STOCK', value: 'stock', align: 'left' },
          { text: 'TYPE', value: 'orderType', align: 'left' },
          { text: 'ORDER TERM', value: 'orderTerm', align: 'left' },
          { text: 'PRICE TYPE', value: 'priceType', align: 'left' },
          { text: 'UNIT PRICE', value: 'unitPrice', align: 'left' },
          { text: 'QUANTITY REQ', value: 'quantityReq', align: 'left' },
          { text: 'QUANTITY EXEC', value: 'quqntityExec', align: 'left' },
          { text: 'STATUS', value: 'status', align: 'left' },
          {text: '', value: 'action', align: 'left'}
        ]
      }
    }
  }
</script>

<style scoped lang="sass">

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
