<!--
  The component for funding user accounts

-->
<template>

  <v-container fluid>

    <!-- HEADER -->
    <v-layout row>
      <v-flex class="font-size-20 csp-light-blue-text">Fund My Account</v-flex>
    </v-layout> <hr>

    <!-- Form and Privacy Content -->
    <v-layout row>

      <!-- Fund Account Form -->
      <v-flex xs5>
        <fund-account-form
          :user="user"
          :username="username"
          :cashAccounts="nairaCashAccounts"
          :portalUsername="portalUsername">
        </fund-account-form>
      </v-flex>

      <!-- Privacy data -->
      <v-flex xs7>
        <fund-account-policy>
        </fund-account-policy>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import FundAccountForm from './FundAccountForm'
import FundAccountPolicy from './FundAccountPolicy'
import {mapState, mapGetters} from 'vuex'

export default
{
  components: {
    FundAccountForm,
    FundAccountPolicy
  },

  computed: {
    ...mapGetters({
      'nairaCashAccounts': 'getNairaCashAccountsForAccountFunding',
      'username': 'getUsername'
    }),

    ...mapState({
      'user': (store) => store.user
    }),

    portalUsername: function () {
      return this.user.info.portalUserName
    }
  }

}
</script>

<style>

</style>
