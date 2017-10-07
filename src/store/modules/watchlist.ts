/**
 * Store for all things watchlist related
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

const state = {
  watchlists: []
}

const getters = {

}

const mutations = {

  /**
   * Set the security selected on the watchlist page
   *
   * @param {any} state
   * @param {any} newlySelectedSecurity
   */
  [mutationTypes.SET_SECURITY_SELECTED_ON_WATCHLIST_PAGE](state, newlySelectedSecurity) {
    state.selectedSecurityOnTradePage = newlySelectedSecurity
  }

}

export default {
  state,
  getters,
  mutations
}
