/**
 * Cash store
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import UserService from '../../services/UserService';

const state = {
  userData: {}
}

const getters = {

}

const mutations = {
  [mutationTypes.SAVE_USER_CASH_DATA_TO_STORE] (state, userData) {
    state.userData = userData.CA
  }
}




export default {
  state,
  getters,
  mutations
}
