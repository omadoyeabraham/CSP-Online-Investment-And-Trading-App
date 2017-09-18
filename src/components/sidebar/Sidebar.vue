<template>
    <v-navigation-drawer
      class="pb-0"
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
        <span>Naira Investments</span>
        <router-link to="/dashboard">
          <i class="fa fa-home" aria-hidden="true"></i>
        </router-link>
      </div>
      <UserInvestments :AccountInvestments="nairaInvestments"></UserInvestments>

      <!-- Dollar Investments -->
      <div
        class="sidebar-header d-flex justify-content-between"
        v-if="mini===false">
        <span>Dollar Investments</span>
      </div>
      <UserInvestments :AccountInvestments="dollarInvestments"></UserInvestments>


      <!-- Account actions -->
      <div
        class="sidebar-header d-flex justify-content-between"
        v-if="mini===false">
        <span>Account Actions</span>
      </div>

      <UserAccountActionsComponent :accountActions="accountActions"></UserAccountActionsComponent>

    </v-navigation-drawer>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  // Component for the user's account summary
  import UserInvestments from './UserInvestments';

  // Component for the user's account actions
  import UserAccountActionsComponent from './UserAccountActions';

  // Getting the user's data from the Sidebar service
  import {nairaInvestments, dollarInvestments, userAccountActions} from '../../services/SidebarService.ts';

  const NairaInvestments = nairaInvestments;
  const DollarInvestments = dollarInvestments;
  const accountActions = userAccountActions;

  export default
  {
    components: {
      UserInvestments,
      UserAccountActionsComponent
    },

    props: [
      'isVisible'
    ],

    // Component specific data
    data () {
      return {
        nairaInvestments: NairaInvestments,
        dollarInvestments: DollarInvestments,
        accountActions: accountActions,
        showSidebar: this.isVisible,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null,
        mini: true,
        username: 'Kiliwi Nwachukwu Ezegburugburu'
      }
    },

    watch: {
      isVisible: function () {
        this.showSidebar = this.isVisible
      }
    },

    // Computed properties gotten mainly from the global application store
    computed: mapState({
      'sidebarVisibility': (store) => store.state.dashboard.sidebarVisibility
    }),

    methods: {
      ...mapMutations([
        'TOGGLE_SIDEBAR'
      ])
    }

  }
</script>

<style scoped lang="sass">
  .toolbar__content
    border-bottom: 1px solid #ccc
  .sidebar-header
    font-size: 2rem
    color: #1a2155
    margin: 5px
    margin-top: 10px
    margin-bottom: 0
    border-bottom: 1px solid rgb(204,204,204)

</style>
