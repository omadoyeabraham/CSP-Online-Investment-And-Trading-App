<template>
  <v-container fluid class="p0">

    <table class="table table-bordered table-striped  elevation-1 tradeHistoryTable">
      <thead class="bg-csp-light-blue white--text tradeHistoryTableHeader">
        <th>ORDER DATE</th>
        <th>STOCK</th>
        <th>TYPE</th>
        <th>ORDER TERM</th>
        <th>PRICE TYPE</th>
        <th class="text-right">UNIT PRICE</th>
        <th class="text-right">QUANTITY REQ</th>
        <th class="text-right">QUANTITY EXEC</th>
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
          <td class="font-size-11 p5 text-right">
            <span v-if="item.limitPrice">{{item.limitPrice}}</span>
            <span v-else>---</span>
          </td>
          <td class="font-size-11 p5 text-right">{{item.quantityRequested | currency('', 2)}}</td>
          <td class="font-size-11 p5 text-right">{{item.quantityFilled | currency('',2)}}</td>
          <td class="font-size-11 p5">{{item.fixOrderStatus}}</td>
          <td class="text-center">
            <span v-if="item.canBeCancelled"
              class="emulate-link"
              data-toggle="tooltip" data-placement="top" title="CANCEL ORDER"
              @click="showCancelTradeOrder(item.id, $event)">
              <i class="fa fa-times red--text"></i>
            </span>
          </td>
        </tr>
      </tbody>

      <tbody v-if="orders === null">
        <tr>
          <td colspan="9" class="text-center">Loading Trade History ...</td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog for cancelling trade orders -->
    <v-dialog v-model="showCancelTradeOrderDialog"
      lazy absolute
      :max-width='500'>
      <v-btn id="openCancelTradeOrderDialog"
        style="display: none" color="primary" dark slot="activator"></v-btn>
      <v-card>
        <v-card-title class="d-flex justify-center  p15 pt20">
          <h4 class="font-size-20">Are you sure you want to cancel this order?</h4>
        </v-card-title>

          <v-card-text>
            <!-- Loading Icon when cancelling mandates -->
            <v-layout v-if="cancellingTradeOrder"  row class=" d-flex justify-center ">
              <v-flex class="xs6 d-flex justify-center align-center">
                 <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                 <span class="font-size-12 ml5">Cancelling Mandate</span>
              </v-flex>
            </v-layout>
          </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            color="green darken-1"
            style="background: #4c7396; color: #FFFFFF"
            @click="cancelOrder(this.tradeOrderToCancel)">
            Yes, Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            class="red darken-1 white--text"
            @click="cancelTradeOrderCancelForm">
            No
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!--Snackbar to show when order is not successfully cancelled -->
    <v-snackbar error
      :timeout="snackbarTimeout"
      :top="true"
      :multi-line="snackbarMode === 'multi-line'"
      :vertical="snackbarMode === 'vertical'"
      :color="'success'"
      v-model="showTradeCancelledFailedSnackbar"
      >
      Trade order failed to cancel
    </v-snackbar>

  </v-container>
</template>

<script>
  import StockbrokingService from '../../../services/StockbrokingService'
  import {mapState} from 'vuex'
  import * as mutationTypes from '../../../store/mutation-types'
  export default
  {
    props: ['orders'],

    data () {
      return {
        selectedTradeOrderToCancel: null,
        showCancelTradeOrderDialog: false,
        showTradeCancelledFailedSnackbar: false,
        snackbarTimeout: 3000,
        snackbarMode: '',
        cancellingTradeOrder: false,
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
    },

    computed: {
      ...mapState({
        'tradeOrderToCancel': (store) => store.stockbroking.tradeOrderToCancel,
        'showTradeCancelledSnackbar': (store) => store.stockbroking.showTradeCancelledSnackbar
      })
    },

    methods: {

      /**
       * Show the dialog for cancelling a trade order
       * also set the trade order to be cancelled
       *
       * @param id | The unique id of the trade order to be cancelled
       */
      showCancelTradeOrder: function (id, event) {
        // Set the trade order to be cancelled
        this.selectedTradeOrderToCancel = id

        // Display the cancel popup modal/dialog
        document.querySelector('#openCancelTradeOrderDialog').click()

        /**
         * Stopping the event propagation because of the auto-close quirk that vuetify's dialog
         * popup has if the click event is not triggered from within the activator slot of the
         * dialog component
         */
        event.stopPropagation()
      },

      /**
       * Cancel a trade order
       *
       */
      cancelOrder: function (id) {
        // Show the cancelling trade order spinner
        this.cancellingTradeOrder = true

        let cancellingOrder = StockbrokingService.cancelTradeOrder(this.tradeOrderToCancel)

        cancellingOrder.then((response) => {
          // Refresh the trade orders to reflect the cancelled order
          StockbrokingService.getTradeOrders(0)

          // Hide the cancelling trade order spinner
          this.cancellingTradeOrder = false

          // Set the store state that shows the success popup ..NOT WORKING cus snackbar is commented out in trade history page
          this.$store.commit(mutationTypes.SET_SHOW_TRADE_CANCELLED_SNACKBAR, true)

          // Close the popup and clear the selected trade order
          this.cancelTradeOrderCancelForm(true)
        }).catch((error) => {
          console.log(error)
          // Hide the cancelling trade order spinner
          this.cancellingTradeOrder = false

          // Show the error snack bar
          this.showTradeCancelledFailedSnackbar = true

          // Close the popup and clear the selected trade order
          this.cancelTradeOrderCancelForm(false)
        })
      },

      // Close and clear the form for updating watchlists
      cancelTradeOrderCancelForm: function (status) {
        // Close the dialog modal
        this.showCancelTradeOrderDialog = false
      }
    },

    watch: {
      /**
       * Watch and set the trade order to be cancelled in the STB store.
       * This approach was used because the event.stopProgation() of the dialog box
       * was messing up this components data variables that were set
       */
      selectedTradeOrderToCancel: function (tradeOrder) {
        this.$store.commit(mutationTypes.SET_TRADE_ORDER_TO_CANCEL, tradeOrder)
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
  .emulate-link
    &:hover
      cursor: pointer
</style>
