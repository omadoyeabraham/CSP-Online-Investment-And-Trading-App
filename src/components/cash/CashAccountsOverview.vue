<!--
 This component controls the cash overview page.
 The page displays a list of all cash accounts the user owns, with pertinent info about the account and also a link to view details about the account
-->

<template>
<v-container fluid class="p20">
    <cash-accounts-overview-header></cash-accounts-overview-header>

    <table class="table table-striped table-bordered w100p mt15" id="cashOverviewTable">
      <thead>
        <tr>
          <th class="font-weight-bold">CASH ACCOUNT</th>
          <th>CURRENCY</th>
          <th class="text-right">UNCLEARED CASH</th>
          <th class="text-right">CASH AVAILABLE</th>
          <th class="text-right">TOTAL BALANCE</th>
        </tr>
      </thead>
        <tbody>
      <tr v-for="(cashAccount, index) in nairaCashAccounts" :key="index">
        <td @click="viewCashAccount(cashAccount.id, cashAccount.currency)" class="link">{{ cashAccount.label }} </td>
        <td>{{ cashAccount.currency }}</td>
        <td class="text-right"></td>
        <td class="text-right">{{cashAccount.clearedBalance | currency('', 2)}}</td>
        <td class="text-right">{{}}</td>
      </tr>
    </tbody>
    </table>

    <!-- Naira and Dollar balances -->
    <v-flex xs12 class="mt15">
      <v-flex text-right class="font-size-14 csp-light-blue-text font-weight-bold">
        <span>Naira Balance: </span>
        <span class="ml6">&#8358;31,202.69</span>
      </v-flex>
      <v-flex text-right class="mt5 font-size-14 csp-light-blue-text font-weight-bold">
        <span>Dollar Balance: </span>
        <span class="ml6">&#8358;31,202.69</span>
      </v-flex>
    </v-flex>

    <!-- Note -->
    <v-flex xs12 class="height-55px mb6 mt100">
      <p class="red--text font-size-12 mt20"><i>*Note to be added here.</i></p>
    </v-flex>


</v-container>
</template>



<script>
import {mapGetters} from 'vuex'
import CashAccountsOverviewHeader from './CashAccountsOverviewHeader'
import CashService from '../../services/CashService'

export default {
  data () {
    return {
      name: 'Cash money'
    }
  },

  computed: {
    ...mapGetters({
      'nairaCashAccounts': 'getNairaCashAccounts'
    })
  },

  components: {
    CashAccountsOverviewHeader
  },

  methods: {
    /**
     * Set and navigate to the appropriate cash account page with the selected cash account
     */
    viewCashAccount: function ($cashAccountId, $currency = 'NGN') {
      if ($currency === 'NGN') {
        CashService.changeSelectedNairaCashAccount($cashAccountId)
        this.$router.push('/cash/naira')
      }

      if ($currency === 'USD') {
        CashService.changeSelectedDollarCashAccount($cashAccountId)
        this.$router.push('/cash/dollar')
      }
    }
  }

}
</script>


<style lang="sass" scoped>
  .link
    &:hover
      cursor: pointer;
  #cashOverviewTable
    margin-bottom: 0px !important
    thead
      background: #4c7396
      tr
        height: 25px
        th
          color: #FFFFFF
          padding: 15px 10px !important
          font-size: 12px
    tbody
      td
        padding: 15px 10px !important
        height: 25px
        color: #31708f
        font-size: 13px
</style>
