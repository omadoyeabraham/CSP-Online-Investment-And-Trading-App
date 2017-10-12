<template>
  <v-container fluid class="pb0">

    <!-- Page heading and Fund account button -->
    <v-layout row>
      <v-flex d-flex align-center>
        <h3 class="font-size-20 csp-light-blue-text">{{title}}</h3>
      </v-flex>
      <v-flex d-flex justify-end align-start>
        <v-btn info class="blue darken-4 font-size-10 p0 ml-auto mb0 mr0">
          Fund Account
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- Number of accounts and account switching -->
    <v-layout row class="mb10">
      <v-flex d-flex align-end>
        <h3 class="font-size-11 csp-blue-text font-weight-bold">NUMBER OF CASH ACCOUNTS: {{totalNumberOfCashAccounts}} ACCOUNTS</h3>
      </v-flex>
      <v-flex d-flex justify-end>
        <select class="custom-select mt10" v-model="selectedDollarCashAccountID">
          <option v-for="(item, index) in cashAccounts" :key="index" v-bind:value="item.id">{{item.label}}</option>
        </select>
      </v-flex>
    </v-layout>
    <hr class="mb1">

    <!-- Period and date range search -->
    <v-layout row class=" mb0 height-60px">
      <!-- period -->
      <v-flex d-flex align-center>
        <h4 class="font-size-12">
          PERIOD: {{startDate | moment("DD MMMM YYYY") }} TO {{endDate | moment("DD MMMM YYYY") }}
        </h4>
      </v-flex>

      <!-- Date range -->
      <v-flex class="mr10">
        <v-layout row>
          <v-flex xs5>
          </v-flex>

          <!-- START DATE -->
          <v-flex xs3>
            <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
              <v-text-field slot="activator" label="Start Date" v-model="startDate" prepend-icon="event" readonly>
              </v-text-field>
              <v-date-picker v-model="startDate" scrollable autosave>
              </v-date-picker>
            </v-menu>

          </v-flex>
          <!-- EOF START DATE -->

          <!-- END DATE -->
          <v-flex xs3>
            <v-menu lazy :close-on-content-click="false" v-model="menu2" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
              <v-text-field slot="activator" label="End Date" v-model="endDate" prepend-icon="event" readonly>
              </v-text-field>
              <v-date-picker v-model="endDate" scrollable autosave>
              </v-date-picker>
            </v-menu>

          </v-flex>
          <!-- EOF END DATE -->

          <v-btn class="mr5 ml-auto blue darken-4" fab dark small primary xs1 @click="search">
            <v-icon>search</v-icon>
          </v-btn>

        </v-layout>
      </v-flex>
    </v-layout>
    <hr class="mt0">

  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import * as mutationTypes from '../../store/mutation-types'

import CashService from '../../services/CashService'

export default
{
  props: ['cashAccounts', 'title'],

  data () {
    return {
      selectedDollarCashAccountID: this.$store.state.cash.selectedDollarCashAccount.id,
      menu: false,
      menu2: false
    }
  },

  computed: {
    ...mapGetters({
      'totalNumberOfCashAccounts': 'getTotalNumberOfCashAccounts'
    }),

    ...mapState({
      'selectedDollarCashAccount': (store) => store.cash.selectedDollarCashAccount
    }),

    startDate: {
      get () {
        return this.$store.state.cash.dollarSearchStartDate
      },
      set (value) {
        this.$store.commit(mutationTypes.SET_DOLLAR_SEARCH_START_DATE, value)
      }
    },

    endDate: {
      get () {
        return this.$store.state.cash.dollarSearchEndDate
      },
      set (value) {
        this.$store.commit(mutationTypes.SET_DOLLAR_SEARCH_END_DATE, value)
      }
    }

  },

  watch: {
    selectedDollarCashAccountID: function (newlySelectedCashAccountID, startDate, endDate) {
      CashService.changeSelectedDollarCashAccount(newlySelectedCashAccountID, this.startDate, this.endDate)
    }
  },

  methods: {
    // Get the cash statements in the date range selected by the user
    search: function () {
      CashService.getDollarCashStatements(this.startDate, this.endDate)
    }
  }
}
</script>

<style>

</style>
