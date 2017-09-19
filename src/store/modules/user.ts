/**
 * This store module defines the state,getters,mutations and actions for all things user related.
 * Th-s module handles:
 *  + Storing the authenticated user
 *  + Changing user details / profile
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
import UserService  from '../../services/UserService';

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

 // Initial store state
const state: object = {
  info: {},
  stockbroking: {
    stbExchangeTotalValue: 0,
    stbManagedTotalValue: 0,
    totalValue: 0
  },
  cashAccount: {
    totalValue: 0
  },
  fixedIncome: {
    totalValue: 0
  },

}

 // Getters
const getters = {
  // Return the full username
  getUsername: (state) => {
    return `${state.info.firstName} ${state.info.lastName}`
  }

}

const mutations = {

  // Mutation used to save a user's details to the store upon successful authentication of a user
  [mutationTypes.SAVE_AUTHENTICATED_USER_TO_STORE] (state, userData) {
    state.info = userData.customer;
    state.stockbroking = userData.STB;
    state.cashAccount = userData.CA;
    state.fixedIncome = userData.FI;

    state.stockbroking.totalValue = UserService.getStbTotalValue(state.stockbroking)
  }

} // End Of MUTATIONS

export default {
  state,
  getters,
  mutations
}
