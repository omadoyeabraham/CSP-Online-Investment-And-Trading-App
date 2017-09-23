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

    <v-data-table v-bind:headers="tableheaders" :items="bondHoldings" :search="search" id="tradeHistoryTable" class="table-striped elevation-1">
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
          <td class="font-size-10">{{props.item.securityName}}</td>
          <td class="font-size-10">{{props.item.quantityHeld}}</td>
          <td class="font-size-10">{{props.item.marketPrice}}</td>
          <td class="font-size-10">{{props.item.orderTermLabel}}</td>
          <td class="font-size-10">{{props.item.maturityDate}}</td>
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

export default
{
  props: ['bondHoldings'],
  // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
  beforeCreate () {

  },

  data () {
    return {
      show: true,
      search: '',
      pagination: {
        sortBy: 'name'
      },
      tableheaders: [
        { text: 'SECURITY', value: 'orderDate', align: 'left', sortable: false },
        { text: 'UNITS', value: 'stock', align: 'left' },
        { text: 'CLEAN PRICE(₦)', value: 'orderType', align: 'left' },
        { text: 'FACE VALUE(₦)', value: 'orderTerm', align: 'left' },
        { text: 'MATURITY DATE', value: 'priceType', align: 'left' },
        { text: 'ACCRUED COUPON(₦)', value: 'unitPrice', align: 'left' },
        { text: 'ACTION', value: 'quantityReq', align: 'left' }
        // { text: 'QUANTITY EXEC', value: 'quqntityExec', align: 'left' },
        // { text: 'STATUS', value: 'status', align: 'left' }
        // {text: '', value: 'action', align: 'left'}
      ]
    }
  }

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
