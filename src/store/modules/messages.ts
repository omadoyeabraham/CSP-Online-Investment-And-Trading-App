/**
 * This store module defines the state,getters,mutations and actions for all things message related.
 * Used to provide feedback on various activities in the application to the user
 *
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

import * as mutationTypes from '../mutation-types.js';


// Initial store state
const state = {
  mandateHasBeenPlaced: false
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
  [mutationTypes.SET_MANDATE_PLACEMENT_STATE](state, mandatePlacementState) {
    state.mandateHasBeenPlaced = mandatePlacementState

    // Remove after 3 seconds
    setTimeout(function () { state.mandateHasBeenPlaced = false;
    }, 3000);
  },

  /**
   * Clear the mandate placement message, and set it to null
   *
   * @param {any} state
   */
  [mutationTypes.CLEAR_MANDATE_PLACEMENT_STATE](state) {
    state.mandateHasBeenPlaced = false
  }

}

export default {
  state,
  getters,
  mutations
}
