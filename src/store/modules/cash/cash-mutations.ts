
// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../../mutation-types.js';

import _ from 'lodash'
import moment from 'moment'

import UserService from '../../../services/UserService';


const mutations = {

  /**
   * Save the user cash account data to the vuex store, also set the default naira and dollar cash accounts
   *
   * @param {any} state
   * @param {any} userData
   */
  [mutationTypes.SAVE_USER_CASH_DATA_TO_STORE](state, userData) {
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
   * Update the user cash account data in the vuex store
   *
   * @param {any} state
   * @param {any} userData
   */
  [mutationTypes.UPDATE_USER_CASH_DATA_IN_STORE](state, userData) {
    state.userData = userData.CA

  },

  /**
   * Change the selected cash naira account in the entire application
   *
   * @param {any} state
   * @param {number} cashAccountID
   */
  [mutationTypes.CHANGE_SELECTED_NAIRA_CASH_ACCOUNT](state, cashAccountID: number) {
    let selectedCashAccount = []

    state.userData.NGN.forEach((cashAccount) => {
      if (cashAccount.id == cashAccountID) {
        selectedCashAccount = cashAccount
      }
    })

    state.selectedNairaCashAccount = selectedCashAccount
  },

  /**
   * Change the selected dollar cash account in the entire application
   *
   * @param {any} state
   * @param {number} cashAccountID
   */
  [mutationTypes.CHANGE_SELECTED_DOLLAR_CASH_ACCOUNT](state, cashAccountID: number) {
    let selectedCashAccount = []

    state.userData.USD.forEach((cashAccount) => {
      if (cashAccount.id == cashAccountID) {
        selectedCashAccount = cashAccount
      }
    })

    state.selectedDollarCashAccount = selectedCashAccount
  },

  /**
   * Set the Naira cash statements being viewed by the user
   *
   * @param {any} state
   * @param Array<objects> cashStatements
   */
  [mutationTypes.SET_NAIRA_CASH_STATEMENTS](state, cashStatements) {
    state.nairaCashStatements = cashStatements

  },

  /**
   * Set the Dollar cash statements being viewed by the user
   *
   * @param {any} state
   * @param Array<objects> cashStatements
   */
    [mutationTypes.SET_DOLLAR_CASH_STATEMENTS](state, cashStatements) {
    state.dollarCashStatements = cashStatements
  },

  [mutationTypes.SET_NAIRA_SEARCH_START_DATE](state, newStartDate) {
    state.nairaSearchStartDate = newStartDate
  },

  [mutationTypes.SET_DOLLAR_SEARCH_START_DATE](state, newStartDate) {
    state.dollarSearchStartDate = newStartDate
  },

  [mutationTypes.SET_NAIRA_SEARCH_END_DATE](state, newEndDate) {
    state.nairaSearchEndDate = newEndDate
  },

  [mutationTypes.SET_DOLLAR_SEARCH_END_DATE](state, newEndDate) {
    state.dollarSearchEndDate = newEndDate
  }

}


export default mutations
