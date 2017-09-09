<template>
    <v-navigation-drawer absolute persistent light v-model="showSidebar" overflow>

      <v-toolbar flat class="transparent" >
        <v-list class="pa-0" style="border-bottom: 1px solid #eee">
          <v-list-tile avatar >
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content >
              <v-list-tile-title style="white-space: normal">{{username}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <!-- Sidebar heading -->
      <div class="sidebar-header d-flex justify-content-between">
        <span>My Accounts</span>
        <span>
          <i class="fa fa-home" aria-hidden="true"></i>
        </span>
      </div>

      <UserAccountSummaryComponent :accountTypes="accountTypes"></UserAccountSummaryComponent>

      <!-- Account actions -->
      <div class="sidebar-header d-flex justify-content-between">
        <span>Account Actions</span>
      </div>

      <UserAccountActionsComponent :accountActions="accountActions"></UserAccountActionsComponent>

      <router-link to="/dashboard">Dashboard</router-link>


    </v-navigation-drawer>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  // Component for the user's account summary
  import UserAccountSummaryComponent from './UserAccountSummary';

  // Component for the user's account actions
  import UserAccountActionsComponent from './UserAccountActions';

  // Getting the user's data from the Sidebar service
  import {userAccounts, userAccountActions} from '../../services/SidebarService.ts';

  const accountTypes = userAccounts;
  const accountActions = userAccountActions;

  export default
  {
    components: {
      UserAccountSummaryComponent,
      UserAccountActionsComponent
    },

    props: [
      'isVisible'
    ],

    // Component specific data
    data () {
      return {
        accountTypes: accountTypes,
        accountActions: accountActions,
        showSidebar: this.isVisible,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null,
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
    margin-top: 30px
    margin-bottom: 0
    border-bottom: 1px solid rgb(204,204,204)
</style>
