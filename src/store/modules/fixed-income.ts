/**
 * Fixed income store
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import UserService from '../../services/UserService';

const state = {
  userData: {},
  totalValue: 0
}

const getters = {

  /**
   * Get all running Naira fixed income investments for the user
   *
   */
  getRunningNairaInvestments: (state) => {
    let nairaInvestments =  state.userData.NGN
    const runningNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    return runningNairaInvestments;
  }

}

const mutations = {
  [mutationTypes.SAVE_USER_FIXEDINCOME_DATA_TO_STORE] (state, userData) {
    state.userData = userData.FI
    state.totalValue = UserService.getFixedIncomeTotalValue(state.userData)
  }
}




export default {
  state,
  getters,
  mutations
}
