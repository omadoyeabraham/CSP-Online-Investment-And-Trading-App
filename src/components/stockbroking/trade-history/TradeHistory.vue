<!--
  Shows the client's stockbroking trade history

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid>

    <PortfolioSwitchingHeader
      :title="'Stockbroking - Trade History'">
    </PortfolioSwitchingHeader>

    <v-layout row class="mb5">
      <v-flex row class="green align-items-center">
        <span class="ml10">Showing Trade orders from 01-AUG-2017 to 16-SEPT-2017</span>
      </v-flex>

      <v-flex row class="red align-items-center justify-content-end">
        <span class="mr20">Specify date range</span>
        <v-form class="d-flex">

          <!-- Start Date -->
           <v-menu
            lazy
            :close-on-content-click="false"
            v-model="startDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
            >
            <v-text-field
              slot="activator"
              label="Start Date"
              v-model="startDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="startDate" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
           </v-menu>
          <!-- EOF Start Date -->

          <!-- End Date -->
           <v-menu
            lazy
            :close-on-content-click="false"
            v-model="endDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
            >
            <v-text-field
              slot="activator"
              label="End Date"
              v-model="endDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="endDate" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
           </v-menu>
          <!-- EOF End Date -->

        </v-form>
      </v-flex>
    </v-layout>

    <!-- Search -->
    <!-- <v-layout class="mb10">
      <v-flex xs8 offset-xs4 sm6 offset-sm6 lg4 offset-lg8>
        <v-text-field
          append-icon="search"
          label="Search Trade History"
          single-line
          hide-details
          v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout> -->

    <!-- Tabs -->
    <div>
      <v-tabs dark v-model="active">
        <v-tabs-bar class="cyan">
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
          >
            {{ tab }}
          </v-tabs-item>
          <v-tabs-slider class="yellow"></v-tabs-slider>
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
    </div>

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
      console.log('Called before create')
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
        'tradeOrders': (store) => store.stockbroking.tradeOrders,
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
</style>
