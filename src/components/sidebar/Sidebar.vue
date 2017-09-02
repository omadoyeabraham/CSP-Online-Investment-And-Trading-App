<!--
  The sidebar component displays a summary of the client's portfolio balance, and also serves as a navigation bar for the application

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->

 <template>

    <section class="sidebar h-100">

      <!-- Sidebar heading -->
      <div class="sidebar-header d-flex justify-content-between">
        <span>My Accounts</span>
        <span>
          <i class="fa fa-home" aria-hidden="true"></i>
        </span>
      </div>

      <v-card height="100%" class="grey lighten-4" id="navigation-1"  style="z-index: 0">
        <v-navigation-drawer class="grey lighten-4 pb-0 w100p" permanent absolute height="100%" light >
          <UserAccountSummaryComponent :accountTypes="accountTypes"></UserAccountSummaryComponent>
          <UserAccountActionsComponent :accountActions="accountActions"></UserAccountActionsComponent>
        </v-navigation-drawer>
      </v-card>

      <!-- Bottom navigation on sidebar -->
      <v-card height="auto" >
        <v-bottom-nav absolute value="true" class="transparent">
          <v-btn flat light class="teal--text" @click.native="e1 = 1" :value="e1 === 1">
            <span>Accounts</span>
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn flat light class="teal--text" @click.native="e1 = 2" :value="e1 === 2">
            <span>Market</span>
            <v-icon>view_comfy</v-icon>
          </v-btn>
          <v-btn flat light class="teal--text" @click.native="e1 = 3" :value="e1 === 3">
            <span>Contact Us</span>
            <v-icon>record_voice_over</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>

    </section>

 </template>

 <script>
    // Component for the user's account summary
    import UserAccountSummaryComponent from './UserAccountSummary';

    // Component for the user's account actions
    import UserAccountActionsComponent from './UserAccountActions';

    // Getting the user's data from the Sidebar service
    import {userAccounts, userAccountActions} from '../../services/SidebarService.ts';

    const accountTypes = userAccounts;
    const accountActions = userAccountActions;

    export default {
      components: {
        UserAccountSummaryComponent,
        UserAccountActionsComponent
      },
      data () {
        return {
          accountTypes: accountTypes,
          accountActions: accountActions
        }
      }
    }

 </script>

<!-- Stylesheets -->
 <style scoped lang="sass">
    .sidebar
      .sidebar-header
        font-size: 2.5rem
        margin: 5px
        margin-bottom: 0
        border-bottom: 1px solid rgb(204,204,204)
 </style>

