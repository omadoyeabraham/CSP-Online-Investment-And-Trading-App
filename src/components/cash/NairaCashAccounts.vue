<!--
  This component is the parent component for the entire naira cash account page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid class="p0">
      <cash-account-header
        :cashAccounts = "nairaCashAccounts"
        :title = "'Naira Cash Accounts'">
      </cash-account-header>

      <!-- TABS -->
      <div class="container-fluid">

      <!-- TABS -->
      <vue-tabs activeTabColor="#EEE" activeTextColor="#428bca" class="">

        <v-tab title="SUMMARY" class="mt20">
          <cash-account-summary
            :cashStatements="nairaCashStatements"
            :cashStatementSummary="nairaCashStatementSummary"
            :unclearedEffects="nairaUnclearedEffects"
            :currency="'₦'">
          </cash-account-summary>
        </v-tab>

        <v-tab title="DETAILS" class="mt20">
          <cash-account-details
            :cashStatements="nairaCashStatements"
            :currency="'₦'">
          </cash-account-details>
        </v-tab>

      </vue-tabs>
      <!-- EOF TABS -->


      </div>

  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CashService from '../../services/CashService'

  import CashAccountHeader from './CashAccountHeader'
  import CashAccountSummary from './CashAccountSummary'
  import CashAccountDetails from './CashAccountDetails'
  export default
  {

    beforeCreate () {
      CashService.getNairaCashStatements()
    },

    data () {
      return {
        selectedCashAccount: this.$store.state.cash.selectedNairaCashAccount.id,
        tabs: ['SUMMARY', 'DETAILS'],
        selectedTab: null
      }
    },

    components: {
      CashAccountHeader,
      CashAccountSummary,
      CashAccountDetails
    },

    computed: {
      ...mapGetters({
        'nairaCashAccounts': 'getNairaCashAccounts',
        'nairaCashStatements': 'getNairaCashStatements',
        'nairaCashStatementSummary': 'getNairaCashStatementSummary',
        'nairaUnclearedEffects': 'getNairaUnclearedEffects'
      })
    }
  }
</script>

<style>

</style>
