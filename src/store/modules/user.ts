/**
 * This store module defines the state,getters,mutations and actions for all things user related.
 * This module handles:
 *  + Storing the authenticated user
 *  + Changing user details / profile
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */


// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

 // Initial store state
const state: object = {
  info: {}
}

 // Getters
const getters = {
  // Return the full username
  getUsername: (state) => {
    return `${state.info.firstName} ${state.info.lastName}`.toLowerCase()
  }

}

const mutations = {

  // Mutation used to save a user's details to the store upon successful authentication of a user
  [mutationTypes.SAVE_AUTHENTICATED_USER_TO_STORE] (state, userData) {
    state.info = userData.customer;

  }

} // End Of MUTATIONS

export default {
  state,
  getters,
  mutations
}
