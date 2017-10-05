/**
 * Store module for the seperately managed accounts section
 *
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import { ChartService } from '../../services/ChartsService'

// Initial store state
const state: object = {
  smaStb: [],
  smaFi: []
}


// Getters
const getters = {


  /**
    * Calculate the total sma equity value of the user's portfolio
    */
  getSmaTotalEquityValue: (state) => {
    const portfolios = state.smaStb
    let smaTotalValue = 0

    portfolios.forEach((portfolio) => {
      // DO not sum up exchange or non-SMA portfolios
      if (portfolio.portfolioClass != "EXCHANGE" || portfolio.label.indexOf('(SMA)') != -1) {
        smaTotalValue += parseFloat(portfolio.currentValuation.amount)
      } else {
        return
      }
    })

    return smaTotalValue
  },

  userHasSma: (state) => {

  },

  getSmaSectorData: (state, getters) => {
    let totalEquityValue = getters.getSmaTotalValue

    return [{
      name: 'Equities',
      percentageGain: '3.33',
      percentageOfPortfolio: "52.00",
      y: 3149900
    }]
  },

  getSmaAllocationChartData: (state,getters) => {
    const chartData = ChartService.getCspPieChart(getters.getSmaSectorData)

    return chartData
  }

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
