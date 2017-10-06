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
      <v-flex xs6>
        <fund-account-form
          :user="user"
          :username="username"
          :cashAccounts="nairaCashAccounts"
          :portalUsername="portalUsername">
        </fund-account-form>
      </v-flex>

      <!-- Privacy data -->
      <v-flex xs6>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import FundAccountForm from './FundAccountForm'
import {mapState, mapGetters} from 'vuex'

export default
{
  components: {
    FundAccountForm
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
