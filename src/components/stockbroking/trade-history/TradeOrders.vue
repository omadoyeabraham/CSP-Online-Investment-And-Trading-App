<template>
  <v-container fluid class="p0">

    <table class="table table-bordered table-striped  elevation-1 tradeHistoryTable">
      <thead class="bg-csp-light-blue white--text tradeHistoryTableHeader">
        <th>ORDER DATE</th>
        <th>STOCK</th>
        <th>TYPE</th>
        <th>ORDER TERM</th>
        <th>PRICE TYPE</th>
        <th>UNIT PRICE</th>
        <th>QUANTITY REQ</th>
        <th>QUANTITY EXEC</th>
        <th>STATUS</th>
        <th></th>
      </thead>

      <tbody v-if="orders">
        <tr class="tradeHistoryTableBody" v-for="(item, index) in orders" :key="index">
          <td class="font-size-11 p5">{{item.orderDate | moment("DD-MMM-YYYY")}}</td>
          <td class="font-size-11 p5">{{item.securityName}}</td>
          <td class="font-size-11 p5">{{item.orderType}}</td>
          <td class="font-size-11 p5">{{item.orderTermLabel}}</td>
          <td class="font-size-11 p5">{{item.priceType}}</td>
          <td class="font-size-11 p5 ">
            <span v-if="item.limitPrice">{{item.limitPrice}}</span>
            <span v-else>---</span>
          </td>
          <td class="font-size-11 p5">{{item.quantityRequested | currency('', 2)}}</td>
          <td class="font-size-11 p5">{{item.quantityFilled | currency('',2)}}</td>
          <td class="font-size-11 p5">{{item.fixOrderStatus}}</td>
          <td>
            <span></span>
          </td>
        </tr>
      </tbody>

      <tbody v-if="orders === null">
        <tr>
          <td colspan="9" class="text-center">Loading Trade History ...</td>
        </tr>
      </tbody>
    </table>

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
    td
      color: #31708f


  .tradeHistoryTableHeader
    th
      padding: 3px 5px !important
      color: #FFFFFF !important

  tr.tradeHistoryTableBody
    td
      padding: 5px 5px !important
      height: 25px
</style>
