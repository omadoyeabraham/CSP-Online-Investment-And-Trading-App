<!--
  This component handles content under the stocks tab of the portfolio holdings page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
  -->
<template>
  <v-container fluid class="p0 pt10">

    <!-- <v-layout class="mb5 pt0">
      <v-flex xs8 offset-xs4 sm6 offset-sm6 lg4 offset-lg8 class="pt0 mt0">
        <v-text-field append-icon="search" label="Search Stock Holdings" single-line hide-details v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout> -->

    <v-data-table
      hide-actions
      v-bind:headers="tableheaders"
      :items="stockHoldings"
      :search="search"
      :no-data-text="noDataText"
      id="portfolioHoldingsTable" class="table-striped table-bordered elevation-1">
      <template slot="headers" scope="props">
        <tr class="bg-csp-light-blue " id="portfolioHoldingsTableHeader">
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
        <tr id="portfolioHoldingsTableBody" class="indigo--text text--darken-4">
          <td class="font-size-11">{{props.item.securityName}}</td>
          <td class="font-size-11">{{props.item.marketValue}}</td>
          <td class="font-size-11">{{props.item.quantityHeld | currency('',0)}}</td>
          <td class="font-size-11">{{props.item.valuation | currency('',2)}}</td>
          <td class="font-size-11">{{props.item.percentageOfPortfolio | currency('',2)}}</td>
          <td class="font-size-11">{{props.item.costBasis | currency('',2)}}</td>
          <td class="font-size-11">{{props.item.totalCost | currency('',2)}}</td>
          <td class="font-size-11">
            <span v-if="props.item.lost" class="d-inline-flex h-100">
              ({{Math.abs(props.item.gainOrLoss) | currency('',2)}})
            </span>
            <span v-if="props.item.gained" class="d-inline-flex h-100">
              {{props.item.gainOrLoss | currency('',2)}}
            </span>
          </td>
          <td class="">
            <span v-if="props.item.lost" class="d-inline-flex h-100">
              <span class="d-inline-flex align-center">({{Math.abs(props.item.percentageGainOrLoss) | currency('',2)}})</span>
              <v-icon class="text-danger ml5 d-inline-flex align-center ">fa-long-arrow-down</v-icon>
            </span>
            <span v-if="props.item.gained" class="d-inline-flex h-100">
              <span class="d-inline-flex align-center">{{props.item.percentageGainOrLoss | currency('',2)}}</span>
              <v-icon class="text-success ml5 d-inline-flex align-center ">fa-long-arrow-up</v-icon>
            </span>
          </td>
          <td>
            <button
              class="button button-blue-csp elevation-2 mb2"
              @click="tradeStock('BUY', props.item.securityName)">
                BUY
              </button>
              <button
                class="button button-blue-csp elevation-2 mb2"
                @click="tradeStock('SELL', props.item.securityName)">
                SELL
              </button>
          </td>
        </tr>
      </template>
    </v-data-table>


  <div class="mt20">
    <span class="text-danger font-weight-bold">***Gain/Loss is exclusive of sell charges</span>
  </div>


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

  },

  methods: {
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
  #portfolioHoldingsTable
    margin-bottom: 0px !important

  #portfolioHoldingsTableHeader,
  #portfolioHoldingsTableBody
    height: 25px

  #portfolioHoldingsTableHeader
    th
      padding: 0px 5px !important

  #portfolioHoldingsTableBody
    td
      padding: 5px 5px !important
      height: 25px
      color: #31708f
</style>
