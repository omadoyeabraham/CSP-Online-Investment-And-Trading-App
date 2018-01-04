<!--
  Header component for the cash accounts overview page
-->
<template>
  <v-container fluid class="pb0 pl0 pr0">

  <!-- Page heading -->
  <v-layout row class="">
    <v-flex d-flex align-end >
      <h3 class="font-size-20 csp-light-blue-text mb0">
        Cash Accounts / Account Summary
      </h3>
    </v-flex>
  </v-layout>


    <!-- Number of accounts and fund my account button -->
    <v-layout row  class="">
      <v-flex d-flex align-end>
        <h3 class="font-size-11 csp-blue-text font-weight-bold">NUMBER OF CASH ACCOUNTS: {{totalNumberOfCashAccounts}} ACCOUNTS</h3>
      </v-flex>

      <v-flex d-flex justify-end align-start>
        <v-btn :to="'/fund-account'" info  class="fund-account-btn font-size-10 p0 ml-auto mb0 mr0">
          Fund My Account
        </v-btn>
      </v-flex>
    </v-layout>

    <hr class="mt1">

  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      'totalNumberOfCashAccounts': 'getTotalNumberOfCashAccounts'
    })
  }
}
</script>

<style lang="sass" scoped>
  .fund-account-btn
    background: #324e85 !important
    border-radius: 5px
    border: none
    padding: 5px 10px !important
</style>


