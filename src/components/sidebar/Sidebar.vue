<template>
    <v-navigation-drawer
      class="pb-0 pl5"
      persistent
      height="100%"
      clipped
      enable-resize-watcher
      :mini-variant.sync="mini"
      v-model="showSidebar">

      <!-- <v-btn icon @click.native.stop="mini = !mini">
        <v-icon v-if="mini===false">chevron_left</v-icon>
         <v-icon v-if="mini===true">chevron_right</v-icon>
      </v-btn> -->

      <!-- Naira Investments -->
      <div
        class="sidebar-header d-flex justify-content-between"
        v-if="mini===false">
        <span >Naira Investments</span>
        <router-link to="/dashboard">
          <i class="fa fa-home sidebar-icon" aria-hidden="true"></i>
        </router-link>
      </div>
      <UserInvestments :AccountInvestments="nairaInvestments"></UserInvestments>
      <!-- <naira-investments-component
        :stbOverview="stockbrokingOverview">
      </naira-investments-component> -->


      <!-- Dollar Investments -->
      <div
        class="sidebar-header d-flex justify-content-between mt20"
        v-if="mini===false">
        <span>Dollar Investments</span>
      </div>
      <UserInvestments :AccountInvestments="dollarInvestments"></UserInvestments>


      <!-- Account actions -->
      <div
        class="sidebar-header d-flex justify-content-between mt20"
        v-if="mini===false">
        <span>Account Actions</span>
      </div>

      <UserAccountActionsComponent :accountActions="accountActions"></UserAccountActionsComponent>

      <MarketTime
        class="height-55px">
      </MarketTime>

    </v-navigation-drawer>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
  // import StockbrokingService from '../../services/StockbrokingService'

  // Component for the user's account summary
  import UserInvestments from './UserInvestments';

  // Component for the user's account actions
  import UserAccountActionsComponent from './UserAccountActions';

  // Getting the user's data from the Sidebar service
  import {nairaInvestments, dollarInvestments, userAccountActions} from '../../services/SidebarService.ts';

  import {stockbroking} from '../../services/NairaInvestmentsService';
  import MarketTime from '../MarketTime'

  const NairaInvestments = nairaInvestments;
  const DollarInvestments = dollarInvestments;
  const accountActions = userAccountActions;

  export default
  {
    components: {
      UserInvestments,
      UserAccountActionsComponent,
      MarketTime
    },

    props: [
      'isVisible'
    ],

    created () {
      // Continously poll the server every 30 seconds for updated user data
      this.getUpdatedCustomerData = setInterval(this.obtainUpdatedCustomerData, 30000)
    },

    beforeDestroy () {
      clearInterval(this.getUpdatedCustomerData)
    },

    // Component specific data
    data () {
      return {
        getUpdatedCustomerData: null,
        stockbrokingOverview: stockbroking,
        nairaInvestments: NairaInvestments,
        dollarInvestments: DollarInvestments,
        accountActions: accountActions,
        showSidebar: this.isVisible,
        right: null,
        mini: false
      }
    },

    watch: {
      isVisible: function () {
        this.showSidebar = this.isVisible
      }
    },

    // Computed properties gotten mainly from the global application store
    computed: {
      ...mapState({
        'user': (store) => store.user
      }),

      ...mapGetters({
        'userId': 'getUserId'
      })
    },

    methods: {
      ...mapActions({
        updateCustomerData: 'updateCustomerData'
      }),

      ...mapMutations([
        'TOGGLE_SIDEBAR'
      ]),

      obtainUpdatedCustomerData: function () {
        this.updateCustomerData(this.userId)
      }
    }

  }
</script>

<style scoped lang="sass">
  .toolbar__content
    border-bottom: 1px solid #ccc
  .sidebar-header
    font-size: 2rem
    color: #4c7396
    margin: 5px
    margin-top: 10px
    margin-bottom: 0
    border-bottom: 1px solid rgb(204,204,204)

    .sidebar-icon
      color: #428bca

</style>
