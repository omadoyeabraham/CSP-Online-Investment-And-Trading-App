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

      <v-tab title="COMPLETED" class="">
        <TradeOrders
          class="mt20"
          :orders="completedTradeOrders">
        </TradeOrders>
      </v-tab>

      <v-tab title="OUTSTANDING" class="">
        <TradeOrders
          class="mt20"
          :orders="outstandingTradeOrders">
        </TradeOrders>
      </v-tab>

    </vue-tabs>
    <!-- EOF TABS -->


    <!-- Tabs -->
    <!-- <div>
      <v-tabs dark v-model="active">
        <v-tabs-bar class="indigo darken-4" style="height: 40px; overflow-x: none">
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
          >
            {{ tab }}
          </v-tabs-item>
          <v-tabs-slider class="white"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>

          <v-tabs-content
            :id="tabs[0]">
            <v-card flat>
              <TradeOrders
                :orders="completedTradeOrders">
              </TradeOrders>
            </v-card>
          </v-tabs-content>

          <v-tabs-content
            :id="tabs[1]">
            <v-card flat>
              <TradeOrders
                :orders="outstandingTradeOrders">
              </TradeOrders>
            </v-card>
          </v-tabs-content>

        </v-tabs-items>
      </v-tabs>
    </div> -->

    <!-- <TradeOrders
      :orders="tradeOrders">
    </TradeOrders> -->


  </v-container>
</template>

<script>
  // The stockbroking service
  import StockbrokingService from '../../../services/StockbrokingService';

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

    data () {
      return {
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
        'user': (store) => store.user
      }),
      ...mapGetters({
        'completedTradeOrders': 'getCompletedTradeOrders',
        'outstandingTradeOrders': 'getOutstandingTradeOrders'
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
