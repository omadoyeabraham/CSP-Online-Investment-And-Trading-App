/**
 * This store module defines the state,getters,mutations and actions for all things market data related.
 * The market data includes top gainers & losers, nse 5 days data, full market data (for the market data page) e.t.c
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
import { topGainers, topLosers } from '../../services/MarketDataService';

 // Initial store state
const state = {
  topGainers: topGainers,
  topLosers: topLosers
}

 // Getters
const getters = {
  topGainers: (state) => state.topGainers,
  topLosers: (state) => state.topLosers
}

export default {
  state,
  getters
}
