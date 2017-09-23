<!--
  This component handles content under the stocks tab of the portfolio holdings page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
  -->
<template>
  <v-container fluid>

    <v-layout class="mb10">
      <v-flex xs8 offset-xs4 sm6 offset-sm6 lg4 offset-lg8>
        <v-text-field append-icon="search" label="Search Stock Holdings" single-line hide-details v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-data-table
      v-bind:headers="tableheaders"
      :items="stockHoldings"
      :search="search"
      :no-data-text="noDataText"
      id="tradeHistoryTable" class="table-striped elevation-1">
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
        <tr id="tradeHistoryTableBody" class="indigo--text text--darken-4">
          <td class="font-size-10">{{props.item.securityName}}</td>
          <td class="font-size-10">{{props.item.marketValue}}</td>
          <td class="font-size-10">{{props.item.quantityHeld}}</td>
          <td class="font-size-10">{{props.item.valuation}}</td>
          <td class="font-size-10">{{props.item.percentageOfPortfolio}}</td>
          <td class="font-size-10">{{props.item.costBasis}}</td>
          <td class="font-size-10">{{props.item.totalCost}}</td>
          <td class="font-size-10">{{props.item.gainOrLoss}}</td>
          <td class="font-size-10">{{props.item.percentageGainOrLoss}}</td>
          <td>
            <button class="button button-blue-csp elevation-2 mb2">
                BUY
              </button>
              <button class="button button-blue-csp elevation-2 mb2">
                SELL
              </button>
          </td>
        </tr>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>

export default
{
  props: ['stockHoldings'],
  // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
  beforeCreate () {

  },

  data () {
    return {
      show: true,
      search: '',
      noDataText: 'No stock holdings in this account',
      pagination: {
        sortBy: 'name'
      },
      tableheaders: [
        { text: 'SYMBOL', value: 'orderDate', align: 'left', sortable: false },
        { text: 'CUR.PRICE(₦)', value: 'stock', align: 'left' },
        { text: 'UNITS', value: 'orderType', align: 'left' },
        { text: 'CUR.VALUE(₦)', value: 'orderTerm', align: 'left' },
        { text: '% OF PORTFOLIO', value: 'priceType', align: 'left' },
        { text: 'W.A.C.(₦)', value: 'unitPrice', align: 'left' },
        { text: 'TOTAL COST(₦)', value: 'quantityReq', align: 'left' },
        { text: 'GAIN/LOSS(₦)', value: 'quqntityExec', align: 'left' },
        { text: 'GAIN/LOSS(%)', value: 'status', align: 'left' },
        { text: 'ACTION', value: 'action', align: 'left' }
      ]
    }
  },

  computed: {

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
