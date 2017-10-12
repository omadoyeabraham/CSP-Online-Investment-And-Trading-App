<!--
  This component is the parent component for the entire cash account page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid class="p0">
    <dollar-cash-account-header
      :cashAccounts="dollarCashAccounts"
      :title="'Dollar Cash Accounts'">
    </dollar-cash-account-header>

    <!-- TABS -->
    <div class="container-fluid">
      <!-- <v-tabs dark v-model="selectedTab">

        Tabs bar
        <v-tabs-bar class="blue darken-4 mb20">
          <v-tabs-item :key="tabs[0]" :href="'#' + tabs[0]">
            <span class="font-size-14">{{tabs[0]}}</span>
          </v-tabs-item>
          <v-tabs-item :key="tabs[1]" :href="'#' + tabs[1]">
            <span class="font-size-14">{{tabs[1]}}</span>
          </v-tabs-item>
          <v-tabs-slider class="blue darken--2" style="height: 4px">
          </v-tabs-slider>
        </v-tabs-bar>

        Tabs content
        <v-tabs-content :id="tabs[0]">
          <cash-account-summary :cashStatements="dollarCashStatements" :cashStatementSummary="dollarCashStatementSummary" :unclearedEffects="dollarUnclearedEffects"
          :currency="'$'">
          </cash-account-summary>
        </v-tabs-content>

        <v-tabs-content :id="tabs[1]">
          <cash-account-details :cashStatements="dollarCashStatements">
          </cash-account-details>
        </v-tabs-content>

      </v-tabs> -->

      <!-- TABS -->
      <vue-tabs activeTabColor="#EEE" activeTextColor="#428bca" class="">

        <v-tab title="SUMMARY" class="mt20">
          <cash-account-summary :cashStatements="dollarCashStatements"      :cashStatementSummary="dollarCashStatementSummary"  :unclearedEffects="dollarUnclearedEffects"
          :currency="'$'">
          </cash-account-summary>
        </v-tab>

        <v-tab title="DETAILS" class="mt20">
          <cash-account-details :cashStatements="dollarCashStatements" :currency="'$'">
          </cash-account-details>
        </v-tab>

      </vue-tabs>
      <!-- EOF TABS -->
    </div>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import CashService from '../../services/CashService'

import DollarCashAccountHeader from './DollarCashAccountHeader'
import CashAccountSummary from './CashAccountSummary'
import CashAccountDetails from './CashAccountDetails'
export default
{

  beforeCreate () {
    CashService.getDollarCashStatements()
  },

  data () {
    return {
      selectedCashAccount: this.$store.state.cash.selectedDollarCashAccount.id,
      tabs: ['SUMMARY', 'DETAILS'],
      selectedTab: null
    }
  },

  components: {
    DollarCashAccountHeader,
    CashAccountSummary,
    CashAccountDetails
  },

  computed: {
    ...mapGetters({
      'dollarCashAccounts': 'getDollarCashAccounts',
      'dollarCashStatements': 'getDollarCashStatements',
      'dollarCashStatementSummary': 'getDollarCashStatementSummary',
      'dollarUnclearedEffects': 'getDollarUnclearedEffects'
    })
  }
}
</script>

<style>

</style>
