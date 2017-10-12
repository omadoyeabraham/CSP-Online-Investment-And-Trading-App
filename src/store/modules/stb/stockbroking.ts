/**
 * The Stockbroking store module
 */

import getters from './stb-getters'
import mutations from './stb-mutations'

import StockbrokingService from '../../../services/StockbrokingService'
import * as mutationTypes from '../../mutation-types'

// Initial Store State
const state = {
  userHasStb: false,
  marketHighlights: {},
  nseAsi: [],
  topGainers: [],
  topLosers: [],
  tradeOrders: {},
  tradeOrderTerms: [],
  securityNames: [],
  selectedSecurityOnTradePage: null,
  selectedSecurityMarketSnapShot: null,
  selectedSecurityStatusInfo: null,
  marketData: {},
  portfolios: [],
  smaPortfolios: [],
  currentPortfolio: {},
  totalValue: 0
}

const actions = {
  /**
   * Get market data from the API.
   * This call is used to regularly update the market data.
   *
   * @param {any} context
   */
  updateMarketData ({commit, state}) {
    console.log('Updated the market data using actions')
    let gettingMarketData = StockbrokingService.getMarketData()

    gettingMarketData.then((response) => {
      let allMarketData = response.data

      allMarketData.forEach((stockData) => {
        let priceChange = stockData.lastTradePrice - stockData.previousClose
        let priceChangePercent = (priceChange / stockData.previousClose) * 100

        stockData.priceChange = priceChange
        stockData.percentChange = priceChangePercent
      })

      // commit the market data to the stockbroking module of our vue store
      commit(mutationTypes.SAVE_MARKET_DATA_TO_STORE, response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
