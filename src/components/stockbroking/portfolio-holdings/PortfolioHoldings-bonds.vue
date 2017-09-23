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

    <v-layout class="" row wrap>

      <v-flex xs12 sm8>
        <!-- Table -->
        <v-data-table
        v-bind:headers="tableheaders"
        :items="bondHoldings"
        :search="search"
        :no-data-text="noDataText"
        id="tradeHistoryTable"
        class="table-striped elevation-1">
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
              <td class="font-size-10">{{props.item.faceValue}}</td>
              <td class="font-size-10">{{props.item.maturityDate}}</td>
              <td class="font-size-10">{{props.item.accruedCoupon}}</td>
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
      </v-flex>

      <v-flex xs12 sm4>
          <v-card class="white lighten-2 card h-100" dark>

            <div class="w100p bg-csp-light-blue p10">
              <div class="text-uppercase font-weight-bold">BOND INVESTMENT DETAILS</div>
            </div>

            <!-- Card body -->
            <div class="card-block indigo darken-4 p0">
              <ul class="list-group list-group-flush black--text"
                id="selectedBondList"
                 v-if="bondIsSelected">
                <li class="list-group-item font-size-12 white--text">
                  <span>SECURITY</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.securityName}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>MATURITY DATE</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.maturityDate}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                   <span>LAST COUPON DATE</span>
                   <span class="ml-auto font-weight-normal">{{selectedBond.lastCouponDate}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>NEXT COUPON DATE</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.tst}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>COUPON RATE</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.couponRate}}%</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                   <span>CLEAN PRICE</span>
                   <span class="ml-auto font-weight-normal">{{selectedBond.marketPrice}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>DIRTY PRICE</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.dirtyPrice}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>UNITS</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.quantityHeld}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>FACE VALUE</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.faceValue}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>ACCRUED COUPON</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.accruedCoupon}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                  <span>CHANGE</span>
                  <span class="ml-auto font-weight-normal">{{selectedBond.gain}}</span>
                </li>
                <li class="list-group-item font-size-12 white--text">
                 <span>CHANGE(%)</span>
                 <span class="ml-auto font-weight-normal">{{selectedBond.percentGain}}</span>
                </li>


              </ul>
              <div
                class="d-flex justify-center mt20 font-size-12"
                v-if="!bondIsSelected">
                Kindly select an investment to view more information
              </div>
            </div>

           </v-card>
      </v-flex>

    </v-layout>



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

  }

}
</script>

<style scoped lang="sass">

  ul#selectedBondList
    li
      background: #1a2155
      border-bottom: 2px solid #FFFFFF
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
