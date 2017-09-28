<!--
  This component is the parent component for the entire cash account page

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
      <v-tabs
        dark
        v-model="selectedTab">

        <!-- Tabs bar -->
        <v-tabs-bar class="white mb20" >
          <v-tabs-item
            :key="tabs[0]"
            :href="'#' + tabs[0]"
            >
            <span class="font-size-14" style="color: #000000">{{tabs[0]}}</span>
          </v-tabs-item>
          <v-tabs-item
            :key="tabs[1]"
            :href="'#' + tabs[1]">
            <span class="font-size-14 red-text" style="color: #000000">{{tabs[1]}}</span>
          </v-tabs-item>
          <v-tabs-slider
            class="blue darken--2"
            style="height: 4px">
          </v-tabs-slider>
        </v-tabs-bar>

        <!-- Tabs content -->
        <v-tabs-content
          :id="tabs[0]">
          <cash-account-summary
            :cashStatements="nairaCashStatements"
            :cashStatementSummary="nairaCashStatementSummary"
            :unclearedEffects="nairaUnclearedEffects"
            :currency="'₦'">
          </cash-account-summary>
        </v-tabs-content>

        <v-tabs-content
          :id="tabs[1]">
          <cash-account-details
            :cashStatements="nairaCashStatements">
          </cash-account-details>
        </v-tabs-content>

      </v-tabs>
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
