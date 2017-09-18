// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

// Initial Store State
const state = {

  // Orders already placed by the user
  tradeOrders: {},
  marketData: {}

}


// Mutations to this module's store state
const mutations = {

  [mutationTypes.SAVE_TRADE_ORDERS_TO_STORE] (state, tradeOrders: Array<object>) {
    state.tradeOrders = tradeOrders
  },

  [mutationTypes.SAVE_MARKET_DATA_TO_STORE] (state, marketData: Array<object>) {
    state.marketData = marketData
  }

} // EOF mutations



export default {
  state,
  mutations
}
