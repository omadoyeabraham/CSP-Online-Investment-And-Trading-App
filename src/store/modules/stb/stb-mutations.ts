
// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../../mutation-types.js';

import UserService from '../../../services/UserService';

import StbState from './stockbroking'


// Mutations to this module's store state
const mutations = {

  [mutationTypes.SAVE_DASHBOARD_DATA_TO_STORE](state, dashboardData) {
    state.marketHighlights = dashboardData.MARKETHIGHLIGHTS
    state.nseAsi = dashboardData.NSEASI
    state.topGainers = dashboardData.TOPGAINERS
    state.topLosers = dashboardData.TOPLOSERS
  },

  [mutationTypes.SAVE_USER_STOCKBROKING_DATA_TO_STORE](state, userData) {
    state.userData = userData.STB;

    // If the user has at least 1 STB portfolio
    if (userData.STB.hasOwnProperty('EXCHANGE')) {
      state.portfolios = userData.STB.EXCHANGE
      state.smaPortfolios = userData.STB.MANAGED ? (userData.STB.MANAGED) : []

      // Default the current portfolio to the first portfolio returned
      state.currentPortfolio = state.portfolios[0]

      // The user has a stockbroking portfolio
      state.userHasStb = true

    }

  },

  /**
   * Update the user's stockbroking data (portfolios) when the API is polled in the background
   *
   * @param {any} state
   * @param {any} userData
   */
  [mutationTypes.UPDATE_USER_STOCKBROKING_DATA_IN_STORE](state, userData) {
    state.userData = userData.STB;

    // If the user has at least 1 STB portfolio
    if (userData.STB.hasOwnProperty('EXCHANGE')) {
      state.portfolios = userData.STB.EXCHANGE
      console.log(userData.STB.EXCHANGE)
      state.updatesMade += 1
      state.smaPortfolios = userData.STB.MANAGED ? (userData.STB.MANAGED) : []

      // The user has a stockbroking portfolio
      state.userHasStb = true
    }

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

  },

  [mutationTypes.SAVE_TRADE_ORDER_TERMS](state, orderTerms) {
    state.tradeOrderTerms = orderTerms
  },

  [mutationTypes.SAVE_SECURITY_NAMES](state, securityNames) {
    state.securityNames = securityNames
  },

  [mutationTypes.SET_SECURITY_SELECTED_ON_TRADE_PAGE](state, newlySelectedSecurity) {

    if (state.selectedSecurityOnTradePage === newlySelectedSecurity) {
      state.selectedSecurityOnTradePage = null
    }
    state.selectedSecurityOnTradePage = newlySelectedSecurity
  },

  [mutationTypes.CLEAR_SECURITY_SELECTED_ON_TRADE_PAGE](state) {
    state.selectedSecurityOnTradePage = null
  },

  [mutationTypes.SET_TRADE_ORDER_TO_CANCEL] (state, tradeOrderToCancel) {
    state.tradeOrderToCancel = tradeOrderToCancel
  },

  [mutationTypes.SET_SHOW_TRADE_CANCELLED_SNACKBAR] (state, status) {
    state.showTradeCancelledSnackbar = status

    // Remove after 3 seconds
    setTimeout(function () {
      state.showTradeCancelledSnackbar = false;
    }, 3000);
  },


  /**
   * Set the total value of the stb portfolio
   * UNUSED
   *
   * @param {any} state
   * @param {any} stbTotalValue
   */
  [mutationTypes.SET_STOCKBROKING_TOTAL_VALUE](state, stbTotalValue) {
    state.totalValue = "234,690"
  },

  /**
   * Save the market data for the selected security on the trade page to the vuex store
   *
   * @param state
   * @param marketSnapShot
   */
  [mutationTypes.SAVE_SELECTED_SECURITY_MARKET_SNAPSHOT](state, marketSnapShot) {
    state.selectedSecurityMarketSnapShot = marketSnapShot
  },

  /**
   *
   * Commit the info to be displayed on the status box in the trade page, when a stock is selected
   *
   * @param {any} state
   * @param {any} statusInfo
   */
  [mutationTypes.SAVE_SELECTED_SECURITY_STATUS_INFO](state, statusInfo) {
    state.selectedSecurityStatusInfo = statusInfo
  },


  /**
   * Reset all data for the market snapshot component
   *
   * @param {any} state
   */
  [mutationTypes.RESET_MARKET_SNAPSHOT](state) {
    state.selectedSecurityMarketSnapShot = null
    state.selectedSecurityStatusInfo = null
  },

}


export default mutations
