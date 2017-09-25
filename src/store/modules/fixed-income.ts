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
    // Get the FI and Tbill investments
    let nairaInvestments =  state.userData.NGN
    let treasuryBills = state.userData.TBills

    let investments = []

    let runningNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    let runningTbillInvestments = treasuryBills.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    // Loop through running fixed income investments and perform the necessary calculations
    runningNairaInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    // loop through the running Tbills and perform the necessary calculations
    runningTbillInvestments.forEach((investment) => {
      investments.push(investment)
    })

    return investments;
  },

  /**
   * Get all terminated Naira fixed income investments for the user
   *
   */
  getTerminatedNairaInvestments: (state) => {
    let nairaInvestments = state.userData.NGN
    let investments = []

    let runningNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'TERMINATED'
    })

    runningNairaInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    return investments;
  },

  /**
 * Get all running Dollar fixed income investments for the user
 *
 */
  getRunningDollarInvestments: (state) => {
    let nairaInvestments = state.userData.USD
    let investments = []

    let runningNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    runningNairaInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    return investments;
  },

  /**
   * Get all terminated Dollar fixed income investments for the user
   *
   */
  getTerminatedDollarInvestments: (state) => {
    let nairaInvestments = state.userData.USD
    let investments = []

    let runningNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'TERMINATED'
    })

    runningNairaInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    return investments;
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
