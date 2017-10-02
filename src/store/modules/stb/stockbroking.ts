/**
 * The Stockbroking store module
 */

import getters from './stb-getters'
import mutations from './stb-mutations'

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
  currentPortfolio: {},
  totalValue: 0
}


export default {
  state,
  getters,
  mutations
}
