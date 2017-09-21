
// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../../mutation-types.js';

import UserService from '../../../services/UserService';


// Mutations to this module's store state
const mutations = {

  [mutationTypes.SAVE_DASHBOARD_DATA_TO_STORE](state, dashboardData) {
    state.marketHighlights = dashboardData.MARKETHIGHLIGHTS
    state.nseAsi = dashboardData.NSEASI
    state.topGainers = dashboardData.TOPGAINERS.item
    state.topLosers = dashboardData.TOPLOSERS.item
  },

  [mutationTypes.SAVE_USER_STOCKBROKING_DATA_TO_STORE](state, userData) {
    state.userData = userData.STB;

    // If the user has at least 1 STB portfolio
    if (userData.STB.hasOwnProperty('EXCHANGE')) {
      state.portfolios = userData.STB.EXCHANGE

      // Default the current portfolio to the first portfolio returned
      state.currentPortfolio = state.portfolios[0]

    }

    state.totalValue = UserService.getStbTotalValue(state.userData)
  },

  [mutationTypes.SAVE_TRADE_ORDERS_TO_STORE](state, tradeOrders: Array<object>) {
    state.tradeOrders = tradeOrders
  },

  [mutationTypes.SAVE_MARKET_DATA_TO_STORE](state, marketData: Array<object>) {
    state.marketData = marketData
  },

  [mutationTypes.CHANGE_CURRENT_PORTFOLIO](state, accountNo) {
    let selectedPortfolio = []

    state.portfolios.forEach((portfolio) => {
      if (portfolio.accountNo == accountNo) {
        selectedPortfolio = portfolio
      }
    })

    state.currentPortfolio = selectedPortfolio

    // Check to set portfolio holdings if doesn't exist on this portfolio
    if (state.currentPortfolio.portfolioHoldings === undefined) {
      state.currentPortfolio.portfolioHoldings = []
    }

  }

}


export default mutations