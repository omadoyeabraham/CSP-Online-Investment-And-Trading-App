/**
 * Cash store
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import _ from 'lodash'
import moment from 'moment'

import UserService from '../../services/UserService';

const state = {
  userData: {},
  selectedNairaCashAccount: {},
  selectedDollarCashAccount: {},
  nairaCashStatements: [],
  dollarCashStatements: [],
  nairaCashStatementSummary: {},
  nairaSearchStartDate: moment().format('YYYY-MM-01'),
  nairaSearchEndDate: moment().format('YYYY-MM-DD')
}

const getters = {

  /**
   * Return the number of cash accounts that the user has
   */
  getTotalNumberOfCashAccounts: (state) => {
    return (state.userData.NGN.length) + (state.userData.USD.length)
  },

  /**
   * Returns the total number of naira cash accounts owned by the user
   */
  getTotalNumberOfNairaCashAccounts: (state) => {
    return (state.userData.NGN.length)
  },

  /**
   * Returns the total number of dollar cash accounts owned by the user
   */
  getTotalNumberOfDollarCashAccounts: (state) => {
    return (state.userData.USD.length)
  },

  /**
   * Returns the naira cash accounts owned by the user
   */
  getNairaCashAccounts: (state) => {
    return state.userData.NGN
  },

  /**
   * Returns the dollar cash accounts owned by the user
   */
  getDollarCashAccounts: (state) => {
    return state.userData.USD
  },

  /**
   * Returns all cash accounts owned by the user
   */
  getAllCashAccounts: (state) => {
    return _.union(state.userData.NGN, state.userData.USD)
  },

  /**
   * Return the cash statements (which might have been filtered by date) for the current
   * naira cash account selected
   *
   */
  getNairaCashStatements: (state) => {
    return state.nairaCashStatements
  },

  /**
   * Return all uncleared effects in the selected naira cash account
   *
   * Uncleared effects are transactions that have a value date greater than the endDate in
   * the current search range. I.E. as at the endDate of the search these transactions had not yet settled (T+3) and are hence uncleared
   */
  getNairaUnclearedEffects: (state, getters) => {
    let cashStatements = state.nairaCashStatements
    const startDate = state.nairaSearchStartDate
    const endDate = state.nairaSearchEndDate

    let unclearedEffects = cashStatements.filter((cashStatement) => {

      let valueDate = moment(cashStatement.valueDate, 'YYYY-MM-DD')
      let searchEndDate = moment(endDate, 'YYYY-MM-DD')

      return searchEndDate.isBefore(valueDate)
    })

    return unclearedEffects

  },

  /**
   * Returns data computed from the nairaCashStatements used to populate the statement summary box
   *
   */
  getNairaCashStatementSummary: (state, getters) => {

    let cashStatements = state.nairaCashStatements
    let openingStatement = cashStatements[0]
    let closingStatement = cashStatements[cashStatements.length - 1]

    let openingBalance = 0
    let totalDebitAmount = 0
    let totalCreditAmount = 0
    let closingBalance = 0
    let unclearedEffects = 0
    let cashAvailable = 0

    /**
     * Calculating the opening balance
     *  - If there is a debit entry in the statement, add it to the current balance to get the opening balance. This is because the debited amount has been debited (taken out) of the opening balance to
     * arrive at the current balance
     *  - Else subtract the creditAmount (amount added to the initial balance) from the current balance to get the initial balance
     */
     if (parseFloat(openingStatement.debitAmount) > 0) {
       openingBalance = parseFloat(openingStatement.balance) + parseFloat(openingStatement.debitAmount)
     } else {
       openingBalance = parseFloat(openingStatement.balance) - parseFloat(openingStatement.creditAmount)
     }

     // calculating the total amount debited
     cashStatements.forEach((cashStatement) => {
       totalDebitAmount += parseFloat(cashStatement.debitAmount)
     })

     // calculating the total amount credited
     cashStatements.forEach((cashStatement) => {
       totalCreditAmount += parseFloat(cashStatement.creditAmount)
     })

     // Closing Balance
     closingBalance = parseFloat(closingStatement.balance)

     // UnclearedEffects and unclearedBalance
     getters.getNairaUnclearedEffects.forEach((unclearedEffect) => {
       unclearedEffects += parseFloat(unclearedEffect.creditAmount)
     })

     // Cash Available = Most recent balance - uncleared balance (i.e uncleared effects)
     cashAvailable = parseFloat(closingStatement.balance) - unclearedEffects

     return {
       openingBalance,
       totalDebitAmount,
       totalCreditAmount,
       closingBalance,
       unclearedEffects,
       cashAvailable
     }

  }

}

const mutations = {

  /**
   * Save the user cash account data to the vuex store, also set the default naira and dollar cash accounts
   *
   * @param {any} state
   * @param {any} userData
   */
  [mutationTypes.SAVE_USER_CASH_DATA_TO_STORE] (state, userData) {
    state.userData = userData.CA

    // Set the default Naira cash account if the user has at least one naira cash account
    if (typeof state.userData.NGN != "undefined" && state.userData.NGN != null && state.userData.NGN.length > 0) {
      state.selectedNairaCashAccount = state.userData.NGN[0]
    }

    // Set the default Dollar cash account if the user has at least one dollar cash account
    if (typeof state.userData.USD != "undefined" && state.userData.USD != null && state.userData.USD.length > 0) {
      state.selectedDollarCashAccount = state.userData.USD[0]
    }


  },

  /**
   * Change the selected cash account in the entire application
   *
   * @param {any} state
   * @param {number} cashAccountID
   */
  [mutationTypes.CHANGE_SELECTED_CASH_ACCOUNT] (state, cashAccountID: number) {
    let selectedCashAccount = []

    state.userData.NGN.forEach((cashAccount) => {
      if (cashAccount.id == cashAccountID) {
        selectedCashAccount = cashAccount
      }
    })

    state.selectedNairaCashAccount = selectedCashAccount
  },

  /**
   * Set the Naira cash statements being viewed by the user
   *
   * @param {any} state
   * @param Array<objects> cashStatements
   */
  [mutationTypes.SET_NAIRA_CASH_STATEMENTS] (state, cashStatements) {
    state.nairaCashStatements = cashStatements

  },

  [mutationTypes.SET_NAIRA_SEARCH_START_DATE] (state, newStartDate) {
    state.nairaSearchStartDate = newStartDate
  },

  [mutationTypes.SET_NAIRA_SEARCH_END_DATE](state, newEndDate) {
    state.nairaSearchEndDate = newEndDate
  }

}




export default {
  state,
  getters,
  mutations
}
