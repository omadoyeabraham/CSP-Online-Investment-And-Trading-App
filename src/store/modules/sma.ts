/**
 * Store module for the seperately managed accounts section
 *
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

// Initial store state
const state: object = {
  smaStb: [],
  smaFi: []
}


// Getters
const getters = {


}


const mutations = {

  /**
   * Save the user's sma data to the store
   *
   * @param {any} state
   * @param {any} userData
   */
  [mutationTypes.SAVE_USER_SMA_DATA_TO_STORE](state, userData) {
    state.smaStb = userData.STB.MANAGED
    state.smaFi = userData.FI.NGNSMA
  }


} // End Of MUTATIONS



export default {
  state,
  getters,
  mutations
}
