/**
 * This store module defines the state,getters,mutations and actions for all things error related.
 *
 * This store module houses errors from API calls, so they can be properly * *displayed to users
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

import * as mutationTypes from '../mutation-types.js';


 // Initial store state
const state = {
  authenticationErrorMessage: null,
  resetPasswordErrorMessage: null
}

 // Getters
const getters = {
}

// Mutations
const mutations = {

  /**
   * Set the error message received during authentication.
   *
   * @param {any} state
   * @param {string} errorMessage
   */
  [mutationTypes.SET_AUTHENTICATION_ERROR_MESSAGE](state, errorMessage){
    state.authenticationErrorMessage = errorMessage
  },

  /**
   * Clear the authentication error message, and set it to null
   *
   * @param {any} state
   */
  [mutationTypes.CLEAR_AUTHENTICATION_ERROR_MESSAGE](state){
    state.authenticationErrorMessage = null
  },

    /**
   * Set the error message received during authentication.
   *
   * @param {any} state
   * @param {string} errorMessage
   */
  [mutationTypes.SET_RESET_PASSWORD_ERROR_MESSAGE](state, errorMessage) {
    state.resetPasswordErrorMessage = errorMessage
  },

  /**
   * Clear the authentication error message, and set it to null
   *
   * @param {any} state
   */
  [mutationTypes.CLEAR_RESET_PASSWORD_ERROR_MESSAGE](state) {
    state.resetPasswordErrorMessage = null
  }

}

export default {
  state,
  getters,
  mutations
}
