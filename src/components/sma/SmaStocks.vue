<!--
  This component handles content under the stocks tab of the sma page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
  -->
<template>
  <v-container fluid class="p0 pt20">

    <v-data-table
      hide-actions
      v-bind:headers="tableheaders"
      :items="stockHoldings"
      :search="search"
      :no-data-text="noDataText"
      id="portfolioHoldingsTable" class="table-striped table-bordered table-responsive table-sm  elevation-1">
      <template slot="headers" scope="props">
          <tr class="bg-csp-light-blue white--text" id="portfolioHoldingsTableHeader">
            <th>SYMBOL</th>
            <th class="text-right">CUR.PRICE(₦)</th>
            <th class="text-right">UNITS</th>
            <th class="text-right">CUR.VALUE(₦)</th>
            <th class="text-right">% OF PORTFOLIO</th>
            <th class="text-right">W.A.C.(₦)</th>
            <th class="text-right">TOTAL COST(₦)</th>
            <th class="text-right">GAIN/LOSS(₦)</th>
            <th class="text-right">GAIN/LOSS(%)</th>
          </tr>
      </template>

      <template slot="items" scope="props">
        <tr id="portfolioHoldingsTableBody" class="indigo--text text--darken-4">
          <td class="font-size-11">{{props.item.securityName}}</td>
          <td class="font-size-11 text-right">{{props.item.marketPrice}}</td>
          <td class="font-size-11 text-right">{{props.item.quantityHeld | currency('',0)}}</td>
          <td class="font-size-11 text-right">{{props.item.valuation | currency('',2)}}</td>
          <td class="font-size-11 text-right">{{props.item.percentageOfPortfolio | currency('',2)}}</td>
          <td class="font-size-11 text-right">{{props.item.costBasis | currency('',2)}}</td>
          <td class="font-size-11 text-right">{{props.item.totalCost | currency('',2)}}</td>
          <td class="font-size-11 text-right">
            <span v-if="props.item.lost" class="d-inline-flex h-100">
              ({{Math.abs(props.item.gainOrLoss) | currency('',2)}})
            </span>
            <span v-if="props.item.gained" class="d-inline-flex h-100">
              {{props.item.gainOrLoss | currency('',2)}}
            </span>
          </td>
          <td class="font-size-11 text-right">
            <span v-if="props.item.lost" class="d-inline-flex h-100">
              <span class="">({{Math.abs(props.item.percentageGainOrLoss) | currency('',2)}})</span>
              <i class=" ml4 fa fa-arrow-down red--text mt4"></i>
            </span>
            <span v-if="props.item.gained" class="d-inline-flex h-100">
              <span class="">{{props.item.percentageGainOrLoss | currency('',2)}}</span>
              <i class=" ml4 fa fa-arrow-up green--text mt2"></i>
              </span>
            </span>
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
      noDataText: 'No stock holdings under management',
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
      color: #FFFFFF
      font-weight: bold
      font-size: 11px

  #portfolioHoldingsTableBody
    td
      padding: 5px 5px !important
      height: 25px
      color: #31708f
</style>
