<!--
  Shows the client's stockbroking trade history

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

    <PortfolioSwitchingHeader
      :title="'Stockbroking - Trade History'">
    </PortfolioSwitchingHeader>


    <!-- TABS -->
    <vue-tabs activeTabColor="#EEE" activeTextColor="#428bca" class="">

      <v-tab title="OUTSTANDING ORDERS" class="">
        <TradeOrders
          class="mt20"
          :orders="outstandingTradeOrders"
          :category="'outstanding'">
        </TradeOrders>
      </v-tab>

      <v-tab title="ALL ORDERS" class="">
        <TradeOrders
          class="mt20"
          :orders="allTradeOrders"
          :category="''">
        </TradeOrders>
      </v-tab>


<!--
       <v-tab title="PARTIALLY FILLED" class="">
        <TradeOrders
          class="mt20"
          :orders="partiallyFilledTradeOrders"
          :category="'partially filled'">
        </TradeOrders>
      </v-tab> -->

      <!-- <v-tab title="CANCELLED" class="">
        <TradeOrders
          class="mt20"
          :orders="cancelledTradeOrders"
          :category="'cancelled'">
        </TradeOrders>
      </v-tab>  -->

      <!-- <v-tab title="COMPLETED" class="">
        <TradeOrders
          class="mt20"
          :orders="completedTradeOrders"
          :category="'completed'">
        </TradeOrders>
      </v-tab> -->

    </vue-tabs>
    <!-- EOF TABS -->

      <v-snackbar success
        :top="true"
        :multi-line="snackbarMode === 'multi-line'"
        :vertical="snackbarMode === 'vertical'"
        :color="'success'"
        v-model="mandateHasBeenPlaced"
        >
        Mandate Placement Successful

      </v-snackbar>

          <!--Snackbar to show when order is successfully cancelled, commented out until issue with snackbar still showing after reload is resolved -->
        <!-- <v-snackbar success
          :timeout="snackbarTimeout"
          :top="true"
          :multi-line="snackbarMode === 'multi-line'"
          :vertical="snackbarMode === 'vertical'"
          :color="'success'"
          v-model="showTradeCancelledSnackbar"
          >
          Trade order successfully cancelled
        </v-snackbar> -->

  </v-container>
</template>

<script>
  // The stockbroking service
  import StockbrokingService from '../../../services/StockbrokingService';
  import * as mutationTypes from '../../../store/mutation-types'

  import PortfolioSwitchingHeader from '../PortfolioSwitchingHeader'
  import TradeOrders from './TradeOrders'

  import DatePicker from 'vue-md-date-picker'

  import {mapState, mapGetters} from 'vuex';

  export default
  {
    components: {
      DatePicker,
      PortfolioSwitchingHeader,
      TradeOrders
    },
    // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
    beforeCreate () {
      StockbrokingService.getTradeOrders(0);
    },

    beforeDestroy () {
      // Clear the popup for mandate placement successful
      this.$store.commit(mutationTypes.CLEAR_MANDATE_PLACEMENT_STATE)
    },

    data () {
      return {
        snackbarTimeout: 1000,
        snackbarMode: '',
        startDateMenu: false,
        startDate: null,
        endDateMenu: false,
        endDate: null,
        show: true,
        search: '',
        tabs: ['COMPLETED', 'OUTSTANDING'],
        active: null
      }
    },

    computed: {

      ...mapState({
        'user': (store) => store.user,
        'mandateHasBeenPlaced': (store) => store.messages.mandateHasBeenPlaced,
        'showTradeCancelledSnackbar': (store) => store.stockbroking.showTradeCancelledSnackbar
      }),
      ...mapGetters({
        'completedTradeOrders': 'getCompletedTradeOrders',
        'outstandingTradeOrders': 'getOutstandingTradeOrders',
        'partiallyFilledTradeOrders': 'getPartiallyFilledTradeOrders',
        'cancelledTradeOrders': 'getCancelledTradeOrders',
        'allTradeOrders': 'getAllTradeOrders'
      })
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
  .tabs__wrapper
    overflow-x: none !important
</style>
