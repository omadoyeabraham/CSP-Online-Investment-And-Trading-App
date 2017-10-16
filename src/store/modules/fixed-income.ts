/**
 * Fixed income store
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import UserService from '../../services/UserService';
import UtilityService from '../../services/UtilityService';

// Moment.js
import * as moment from 'moment'

const state = {
  userData: {},
  userHasFi: true
  // totalValue: 0
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

    if ((nairaInvestments === undefined) || (treasuryBills === undefined)) {
      return []
    }

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

      let startDate = moment(investment.startDate, "YYYY-MM-DD")
      let durationTillDate = moment().diff(startDate, 'days')

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investment.durationTillDate = durationTillDate

      investments.push(investment)
    })

    // loop through the running Tbills and perform the necessary calculations
    runningTbillInvestments.forEach((investment) => {
      let startDate = moment(investment.startDate, "YYYY-MM-DD")
      let durationTillDate = moment().diff(startDate, 'days')

      let faceValue = parseFloat(investment.faceValue)
      let rate = (parseFloat(investment.currentRate)) / 100
      let accruedInterest = (faceValue * rate * durationTillDate) / 365
      let currentValue = accruedInterest + faceValue
      let valueAtMaturity = parseFloat(investment.faceValueAmount)

      investment.durationTillDate = durationTillDate
      investment.accruedInterest = accruedInterest
      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity

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

    if ((nairaInvestments === undefined)) {
      return []
    }


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

    if ((nairaInvestments === undefined)) {
      return []
    }

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

    if ((nairaInvestments === undefined)) {
      return []
    }


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
   * Get the total value of the user's fixed income portfolio
   *
   */
  getFiTotalValue: (state, getters) => {
    let runningNairaInvestments = getters.getRunningNairaInvestments
    let totalFiValue = 0

    runningNairaInvestments.forEach((nairaInvestment) => {
      totalFiValue += parseFloat(nairaInvestment.currentValue)
    })

    return totalFiValue
  },

  /**
 * Get the total value of the user's dollar investment portfolio
 *
 */
  getDollarInvestmentsTotalValue: (state, getters) => {
    let runningDollarInvestments = getters.getRunningDollarInvestments
    let totalDollarValue = 0

    runningDollarInvestments.forEach((dollarInvestment) => {
      totalDollarValue += parseFloat(dollarInvestment.currentValue)
    })

    return totalDollarValue
  }


}

const mutations = {
  [mutationTypes.SAVE_USER_FIXEDINCOME_DATA_TO_STORE] (state, userData) {
    state.userData = userData.FI
  }
}




export default {
  state,
  getters,
  mutations
}
