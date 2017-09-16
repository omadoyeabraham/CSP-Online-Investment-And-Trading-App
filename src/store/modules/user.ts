/**
 * This store module defines the state,getters,mutations and actions for all things user related.
 * Th-s module handles:
 *  + Storing the authenticated user
 *  + Changing user details / profile
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
// import { authenticationService } from '../../services/AuthenticationService';

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

 // Initial store state
const state: object = {
  info: {},
  stockbroking: {},
  cashAccount: {},
  fixedIncome: {}
}

 // Getters
const getters = {
  info: (state) => state.info
}

const mutations = {

  // Mutation used to save a user's details to the store upon successful authentication of a user
  [mutationTypes.SAVE_AUTHENTICATED_USER_TO_STORE] (state, userData) {
    state.info = userData.customer;
    state.stockbroking = userData.STB;
    state.cashAccount = userData.CA;
    state.fixedIncome = userData.FI;
  }

} // End Of MUTATIONS

export default {
  state,
  getters,
  mutations
}
