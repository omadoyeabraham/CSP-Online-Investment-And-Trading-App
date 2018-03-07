/**
 * Store module for the seperately managed accounts section
 *
 */

// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import * as moment from 'moment'

import { ChartService } from '../../services/ChartsService'

// Initial store state
const state: object = {
  smaStb: [{
    'data': 'initial data'
  }],
  smaFi: []
}


// Getters
const getters = {

  getRunnningSmaFiInvestments: (state) => {
    let fixedIncomeInvestments = state.smaFi

    let runningFiInvestments = fixedIncomeInvestments.filter(investment => {
      return investment.status === 'RUNNING'
    })

    return runningFiInvestments
  },

  /**
    * Calculate the total sma equity value of the user's portfolio
    */
  getSmaTotalEquityValue: (state) => {
    const portfolios = state.smaStb
    let smaTotalValue = 0

    portfolios.forEach((portfolio) => {
      // if (portfolio.portfolioClass != "EXCHANGE" || portfolio.label.indexOf('(SMA)') != -1) {
      // DO not sum up exchange or non-SMA portfolios
      if (portfolio.portfolioClass != "EXCHANGE") {
        smaTotalValue += parseFloat(portfolio.currentValuation.amount)
      } else {
        return
      }
    })

    return smaTotalValue
  },

  getSmaTotalRunningFiValue: (state, getters) => {
    let runningFiInvestments = getters.getRunnningSmaFiInvestments
    let totalFiValue = 0

    runningFiInvestments.forEach(investment => {
      totalFiValue += parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
    })

    return totalFiValue
  },

  getSmaTotalInvestmentsValue: (state, getters) => {
    return getters.getSmaTotalEquityValue + getters.getSmaTotalRunningFiValue
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
  },

  getSmaCurrentPortfolioHoldings: (state, getters) => {
    if(state.smaStb.length === 0) {
      return []
    }

    let smaStb = state.smaStb ? state.smaStb : [{a: 1}]
    let portfolioHoldings = smaStb[0].portfolioHoldings ? smaStb[0].portfolioHoldings : []

    return portfolioHoldings
  },

  getSmaStockPortfolioHoldings: (state, getters) => {

    let currentPortfolioHoldings = getters.getSmaCurrentPortfolioHoldings

    if (currentPortfolioHoldings.length === 0) {
      return []
    }

    // Filter to pick only equity stock
    let stockPortfolioHoldings = currentPortfolioHoldings.filter((portfolioHolding) => {
      return (portfolioHolding.securityType === 'EQUITY')
    })

    let percentageOfPortfolio = 0
    let gainOrLoss = 0
    let percentageGainOrLoss = 0
    let totalCost = 0
    let currentStockValue = 0
    let totalPortfolioValue = getters.currentPortfolioTotalValue
    let currentPortfolioStockHoldings = []

    stockPortfolioHoldings.forEach((stockPortfolioHolding) => {
      percentageOfPortfolio = ((parseFloat(stockPortfolioHolding.valuation)) / totalPortfolioValue) * 100
      totalCost = parseFloat(stockPortfolioHolding.costBasis) * parseFloat(stockPortfolioHolding.quantityHeld)
      gainOrLoss = parseFloat(stockPortfolioHolding.valuation) - totalCost
      percentageGainOrLoss = (gainOrLoss / totalCost) * 100

      stockPortfolioHolding.percentageOfPortfolio = percentageOfPortfolio
      stockPortfolioHolding.gainOrLoss = gainOrLoss
      stockPortfolioHolding.percentageGainOrLoss = percentageGainOrLoss
      stockPortfolioHolding.totalCost = totalCost

      if (gainOrLoss < 0) {
        stockPortfolioHolding.lost = true
      } else if (gainOrLoss > 0) {
        stockPortfolioHolding.gained = true
      }

      currentPortfolioStockHoldings.push(stockPortfolioHolding)
    })

    return currentPortfolioStockHoldings
  },

  getSmaFixedIncomeInvestments: (state, getters) => {
    let fixedIncomeInvestments = state.smaFi
    let investments = []

    // Loop through running fixed income investments and perform the necessary calculations
    fixedIncomeInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      let startDate = moment(investment.startDate, "YYYY-MM-DD")
      let durationTillDate = moment().diff(startDate, 'days')

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investment.durationTillDate = durationTillDate

      investments.push(investment)
    })

    return investments
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
    state.smaStb = userData.STB.MANAGED ? userData.STB.MANAGED : []
    state.smaFi = userData.FI.NGNSMA ? userData.FI.NGNSMA : []
  }


} // End Of MUTATIONS



export default {
  state,
  getters,
  mutations
}
