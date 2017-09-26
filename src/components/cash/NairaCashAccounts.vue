<!--
  This component is the parent component for the entire cash account page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid class="p0">
      <naira-cash-account-header
        :cashAccounts = "nairaCashAccounts">
      </naira-cash-account-header>

      <!-- TABS -->
      <div>
      <v-tabs
        dark
        v-model="selectedTab">

        <!-- Tabs bar -->
        <v-tabs-bar class="blue">
          <v-tabs-item
            :key="tabs[0]"
            :href="'#' + tabs[0]"
            ripple>
            {{tabs[0]}}
          </v-tabs-item>
          <v-tabs-item
            :key="tabs[1]"
            :href="'#' + tabs[1]">
            {{tabs[1]}}
          </v-tabs-item>
          <v-tabs-slider class="blue darken--4"></v-tabs-slider>
        </v-tabs-bar>

        <!-- Tabs content -->
        <v-tabs-content
          :id="tabs[0]">
          <cash-account-summary>
          </cash-account-summary>
        </v-tabs-content>

        <v-tabs-content
          :id="tabs[1]">
          <cash-account-details>
          </cash-account-details>
        </v-tabs-content>

      </v-tabs>
      </div>

  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  import NairaCashAccountHeader from './NairaCashAccountHeader'
  import CashAccountSummary from './CashAccountSummary'
  import CashAccountDetails from './CashAccountDetails'
  export default
  {
    data () {
      return {
        selectedCashAccount: this.$store.state.cash.selectedNairaCashAccount.id,
        tabs: ['SUMMARY', 'DETAILS'],
        selectedTab: null
      }
    },

    components: {
      NairaCashAccountHeader,
      CashAccountSummary,
      CashAccountDetails
    },

    computed: {
      ...mapGetters({
        'nairaCashAccounts': 'getNairaCashAccounts'
      })
    }
  }
</script>

<style>

</style>
