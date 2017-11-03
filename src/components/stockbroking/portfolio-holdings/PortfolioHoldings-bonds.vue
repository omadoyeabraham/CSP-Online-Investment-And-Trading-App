<!--
  This component handles content under the bonds tab of the portfolio holdings page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
  -->
<template>
  <v-container fluid class="p0 pt20">
    <!-- <v-layout class="mb10">
      <v-flex xs8 offset-xs4 sm6 offset-sm6 lg4 offset-lg8>
        <v-text-field append-icon="search" label="Search Bond Holdings" single-line hide-details v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout> -->

    <v-layout class="" row wrap>

      <v-flex xs12 sm8 class="mb20">
        <!-- Table -->
        <v-data-table
        hide-actions
        v-bind:headers="tableheaders"
        :items="bondHoldings"
        :search="search"
        :no-data-text="noDataText"
        id="tradeHistoryTable"
        class="table-striped table-bordered elevation-1">
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
              <td class="font-size-10">{{props.item.faceValue | currency('',2)}}</td>
              <td class="font-size-10">{{props.item.maturityDate | moment('DD-MMM-YYYY')}}</td>
              <td class="font-size-10">{{props.item.accruedCoupon | currency('',2)}}</td>
              <td class="font-size-10">
                <button
                  class="button button-blue-csp elevation-2 mb2"
                  @click="selectBond(props.item.id)">
                    VIEW
                  </button>
              </td>
            </tr>
          </template>
        </v-data-table>

     <div class="mt20">
      <span class="text-danger font-weight-bold">***Gain/Loss is exclusive of sell charges</span>
    </div>
      </v-flex>

      <v-flex xs12 sm4>
              <!-- If a bond is selected -->
          <v-card class="white lighten-2 card h-100" dark
            v-if="bondIsSelected">

            <div class="w100p bg-csp-light-blue p10">
              <div class="text-uppercase font-weight-bold">BOND INVESTMENT DETAILS</div>
            </div>

            <!-- Card body -->
            <div class="card-block indigo darken-4 p0">
              <ul class="list-group list-group-flush black--text"
                id="selectedBondList"
                 >
                <li class="list-group-item font-size-12 white--text">
                  <span>Security</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.securityName}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Maturity Date</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.maturityDate | moment('DD-MMM-YYYY')}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                   <span>Last Coupon Date</span>
                   <span class="ml-auto font-weight-normal">{{selectedBond.lastCouponDate | moment('DD-MMM-YYYY')}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Next Coupon Date</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.nextCouponDate | moment('DD-MMM-YYYY')}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Coupon Rate</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.couponRate}}%</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                   <span>Clean Price</span>
                   <span class="ml-auto font-weight-normal">{{selectedBond.marketPrice}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Dirty Price</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.dirtyPrice | currency('',2)}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Units</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.quantityHeld}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Face Value</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.faceValue | currency('',2)}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Accrued Coupon</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.accruedCoupon | currency('',2)}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>Change</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.gain | currency('',2)}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                 <span>Change(%)</span>
                 <span class="ml-auto font-weight-normal">{{selectedBond.percentGain}}</span>
                </li>


              </ul>
            </div>

           </v-card>

            <!-- If no bond is selected -->
            <v-card
              class="d-flex justify-center align-center font-size-12 min-height-150px no-bond-selected white--text"
              v-if="!bondIsSelected"
              >
              Kindly select an investment to view more information
            </v-card>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default
{
  props: ['bondHoldings'],
  // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
  beforeCreate () {

  },

  data () {
    return {
      show: true,
      bondIsSelected: false,
      noDataText: 'No bond holdings in this account',
      selectedBond: null,
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
      ]
    }
  },

  computed: {
    ...mapState({
      'currentPortfolio': (store) => store.stockbroking.currentPortfolio
    })
  },

  methods: {

    /**
     * Set the selected bond when a user clicks on the view button
     *
     * @argument id  The id of the bond selected
    */
    selectBond: function (id) {
      let userSelectedBond = this.bondHoldings.find((bondHolding) => {
        return bondHolding.id === id
      })

      this.selectedBond = userSelectedBond
      this.bondIsSelected = true
    }

  },

  watch: {
    currentPortfolio: function (newlySelectedPortfolio) {
      // Reset the selected bond when the user changes the selected portfolio
      this.selectedBond = null
      this.bondIsSelected = null
    }
  }

}
</script>

<style scoped lang="sass">

  ul#selectedBondList
    li
      background: #1a2155
      border-bottom: 1px solid #FFFFFF

      span:first-child
        text-transform: capitalize
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
      font-weight: bold

  #tradeHistoryTableBody
    td
      padding: 5px 5px !important
      height: 25px
  .no-bond-selected
    background: #4c7396
</style>
