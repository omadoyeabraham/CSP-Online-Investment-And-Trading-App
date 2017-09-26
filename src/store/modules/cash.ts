/**
 * Cash store
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import UserService from '../../services/UserService';

const state = {
  userData: {},
  selectedNairaCashAccount: {},
  selectedDollarCashAccount: {}
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

  }

}




export default {
  state,
  getters,
  mutations
}
