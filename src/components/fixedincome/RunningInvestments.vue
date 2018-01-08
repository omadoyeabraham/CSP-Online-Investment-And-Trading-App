<template>
  <v-container fluid class="">

  <FixedIncomeHeader
     :showTotalValue="showTotalValue"
    :headerText="headerText"
    :totalValueOfPortfolio="totalValueOfPortfolio"
    :currency="currency"
    class="mb20">
  </FixedIncomeHeader>

  <v-layout class="" row wrap>

    <v-flex xs12 sm8>
      <!-- Table -->
      <v-card class="p10 red--text font-size-11 font-weight-bold">
          You have {{numberOfInvestments}} {{investmentType}} {{investmentTitle}} investments
      </v-card>
      <v-data-table
        v-if="numberOfInvestments > 0"
        v-bind:headers="tableheaders"
        :items="investments"
        :no-data-text="noDataText"
        id="tradeHistoryTable"
        class="table-striped elevation-1"
        hide-actions>
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
            <td class="font-size-10">{{props.item.instrumentTypeLabel}}</td>
            <td class="font-size-10">{{props.item.faceValue | currency('',2)}}</td>
            <td class="font-size-10">{{props.item.accruedInterest | currency('',2)}}</td>
            <td class="font-size-10">{{props.item.currentValue | currency('',2)}}</td>
            <td class="font-size-10">
              <button class="button button-blue-csp elevation-2 mb2" @click="selectInvestment(props.item.id)">
                VIEW
              </button>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 sm4>
      <v-card class="white lighten-2 card h-100" dark>

        <div class="w100p bg-csp-light-blue p10" v-if="investmentIsSelected">
          <div class="text-uppercase font-weight-bold"><span class="text-uppercase">{{investmentType}}</span> INVESTMENT DETAILS</div>
        </div>

        <!-- Card body -->
        <div class="card-block bg-csp-light-blue p0">
          <ul
            class="list-group list-group-flush black--text"
            id="selectedInvestmentList"
            v-if="investmentIsSelected">
            <li class="list-group-item font-size-12 white--text">
              <span>Amount Invested</span>
              <span class="ml-auto font-weight-normal">{{currency}}{{selectedInvestment.faceValue | currency('',2)}}</span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span>Date of Investment</span>
              <span class="ml-auto font-weight-normal">
                {{selectedInvestment.startDate | moment("DD-MMM-YYYY") }}
              </span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span>Date of Maturity</span>
              <span class="ml-auto font-weight-normal">
                {{selectedInvestment.expectedMaturity | moment("DD-MMM-YYYY") }}
              </span>
            </li>
            <li v-if="investmentType!=='terminated'" class="list-group-item font-size-12 white--text">
              <span >Investment Duration</span>
              <span class="ml-auto font-weight-normal">{{selectedInvestment.tenure}} days</span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span v-if="investmentType==='terminated'">Duration till Termination</span>
              <span v-else>Duration till Date</span>
              <span v-if="investmentType==='terminated'" class="ml-auto font-weight-normal">{{selectedInvestment.tenure}} days</span>
              <span v-else class="ml-auto font-weight-normal">{{selectedInvestment.durationTillDate}} days</span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span>Rate of Return</span>
              <span class="ml-auto font-weight-normal">{{selectedInvestment.currentRate}}% P.A.</span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span v-if="investmentType==='terminated'">Return to Termination</span>
              <span v-else>Return to Date</span>
              <span class="ml-auto font-weight-normal">{{currency}}{{selectedInvestment.accruedInterest | currency('',2)}}</span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span>Expected Value at Maturity</span>
              <span class="ml-auto font-weight-normal">{{currency}}{{selectedInvestment.valueAtMaturity | currency('',2)}}</span>
            </li>
            <li class="list-group-item font-size-12 white--text">
              <span v-if="investmentType==='terminated'">Value at Termination</span>
              <span v-else>Current Value of Investment</span>
              <span class="ml-auto font-weight-normal">{{currency}}{{selectedInvestment.currentValue | currency('',2)}}</span>
            </li>

          </ul>
          <div
            class="d-flex no-investment-selected justify-center align-center font-size-12 min-height-200px"
            v-if="!investmentIsSelected">
            Kindly select an investment to view more information
          </div>
        </div>

      </v-card>
    </v-flex>

  </v-layout>

  </v-container>
</template>

<script>
import FixedIncomeHeader from './FixedIncomeHeader'

export default
{

  props: ['currency', 'headerText', 'investments', 'investmentType', 'investmentTitle', 'showTotalValue'],

  data () {
    return {
      noDataText: 'No investments in this account',
      investmentIsSelected: false,
      selectedInvestment: null,
      pagination: {
        sortBy: 'name'
      },
      tableheaders: [
        { text: 'INVESTMENT TYPE', value: 'investmentType', align: 'left', sortable: false },
        { text: `INVESTED(${this.currency})`, value: 'invested', align: 'left' },
        { text: `RETURNS(${this.currency})`, value: 'returns', align: 'left' },
        { text: `CURRENT VALUE(${this.currency})`, value: 'currentValue', align: 'left' },
        {text: '', value: '', align: 'left'}
      ]
    }
  },

  computed: {

    // Get the number of fixed income investments in the portfolio
    numberOfInvestments: function () {
      return this.investments.length
    },

    // Calculate the total value of the fixed income portfolio
    totalValueOfPortfolio: function () {
      let totalValue = 0
      this.investments.forEach((investment) => {
        totalValue += investment.currentValue
      })

      return totalValue
    }
  },

  components: {
    FixedIncomeHeader
  },

  methods: {
    /**
    * Set the selected investment when a user clicks on the view button
    *
    * @argument id  The id of the investment selected
    */
    selectInvestment: function (id) {
      let userSelectedInvestment = this.investments.find((investment) => {
        return investment.id === id
      })

      this.selectedInvestment = userSelectedInvestment
      this.investmentIsSelected = true
    }

  }
}
</script>

<style scoped lang="sass">
    ul#selectedInvestmentList
      li
        background: #1a2155
        border-bottom: 1px solid #FFFFFF
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
    .no-investment-selected
      background: #4c7396
</style>
