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

import UserService from '../../services/UserService'

 // Initial store state
const state = () => ({
  info: {},
  userID: null,
  firstName: null,
  lastName: null,
  portalUsername: null
})

 // Getters
const getters = {

  getFirstName: (state) => {
    return state.firstName
  },

  getLastName: (state) => {
    return state.lastName
  },

  getClientName: (state) => {
    return state.info.label
  },

  getUsername: (state) => {
    let firstName = state.firstName[0].toUpperCase() + state.firstName.slice(1)
    let lastName = state.lastName[0].toUpperCase() + state.lastName.slice(1)

    console.log(typeof firstName, typeof lastName)

    return `${firstName} ${lastName}`
  },

  getPortalUsername: (state) => {
    return `${state.portalUsername}`
  },

  getUserId: (state) => {
    return (state.userID) ? state.userID : 0
  },

  getAccountManagerName: (state) => {
    return (state.accountManager) ? state.accountManager : 'Cardinal Stone Partners'
  },

  getAccountManagerEmail: (state) => {
    return (state.accountManagerEmail) ? state.accountManagerEmail : 'crd@cardinalstone.com'
  }

}

const mutations = {

  // Mutation used to save a user's details to the store upon successful authentication of a user
  [mutationTypes.SAVE_AUTHENTICATED_USER_TO_STORE] (state, userData) {
    // Maintain the same user ID when make 'update' calls for the customer data
    state.userID = (userData.customer) ? userData.customer.id : state.userID

    state.firstName = (userData.customer) ? `${userData.customer.firstName}`.toLowerCase() : state.firstName
    state.lastName = (userData.customer) ? `${userData.customer.lastName}`.toLowerCase() : state.lastName
    state.portalUsername = (userData.customer) ? `${userData.customer.portalUsername}`.toLowerCase() : state.portalUsername


    state.info = (userData.customer) ? userData.customer : state.info;

  },

  // Clear the entire store when the user logs out
  [mutationTypes.CLEAR_USER_STORE] (currentState) {
    const initialState = state()
    Object.keys(initialState).forEach(key => { currentState[key] = initialState[key] })
  }

} // End Of MUTATIONS

const actions = {

  /**
   * Update the customer data, [portfolio holdings etc]
   *
   * @param param0
   */
  updateCustomerData({ commit, state }, customerId) {
    let updatingCustomerData = UserService.getUserData(customerId)
    console.log('Got to the updating customer data action')
    updatingCustomerData.then((response) => {
      let userData = response.data

      // Commit the authenticated user's data to the vue store.
      commit(mutationTypes.UPDATE_USER_STOCKBROKING_DATA_IN_STORE, userData);
      commit(mutationTypes.SAVE_USER_FIXEDINCOME_DATA_TO_STORE, userData);
      commit(mutationTypes.UPDATE_USER_CASH_DATA_IN_STORE, userData);
      commit(mutationTypes.SAVE_USER_SMA_DATA_TO_STORE, userData);
    }).catch((error) => {
      console.log(error)
    })
  }

}

export default {
  state: state(),
  getters,
  actions,
  mutations
}
