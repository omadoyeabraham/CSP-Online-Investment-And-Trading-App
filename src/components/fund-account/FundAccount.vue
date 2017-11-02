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

        <v-snackbar success
        :timeout="snackbarTimeout"
        :top="true"
        :multi-line="snackbarMode === 'multi-line'"
        :vertical="snackbarMode === 'vertical'"
        :color="'success'"
        v-model="showTransactionSuccessDialog"
        >
        Payment Transaction Successful
      </v-snackbar>

      <v-snackbar error
        :timeout="snackbarTimeout"
        :top="true"
        :multi-line="snackbarMode === 'multi-line'"
        :vertical="snackbarMode === 'vertical'"
        :color="'success'"
        v-model="showTransactionErrorDialog"
        >
        Payment Transaction Unsuccessful
      </v-snackbar>

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

  data () {
    return {
      showTransactionSuccessDialog: false,
      showTransactionErrorDialog: false,
      snackbarTimeout: 3000,
      snackbarMode: ''
    }
  },

  created () {
    /**
     * Check to see if the user is being redirected here after a payment transaction
     */
    let responseCode = (this.$route.query.s) ? this.$route.query.s : null

    // Response code is set
    if (responseCode) {
      // Show success dialog for successful transactions
      if (responseCode === '4a7d1e') {
        this.showTransactionSuccessDialog = true
      } else {
        // Show error dialog for wrong transactions
        this.showTransactionErrorDialog = true
      }

      // Hide the dialogs after 3 seconds
      setTimeout(function () {
        this.showTransactionSuccessDialog = false
        this.showTransactionErrorDialog = false
        console.log('aaaaaaaaaaaaaaa')
      }, 3000)
    } else { // response code was not sent

    }
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
