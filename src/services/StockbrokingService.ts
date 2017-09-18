/**
 * This service handles all services related to stockbroking
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 // Data mocks to be replaced with actual API calls
 import StbMockData from '../data-mocks/stockbroking'

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';


/**
 * Get all trade orders that the authenticated user has placed and commit it to the vuex store
 *
 * @param userID: string | The ID of the user
 * @return void
 */
 let getTradeOrders = (userID: number) => {

   // obtain the tradeorders already placed by the user
  let tradeOrders =  StbMockData.tradeOrders;

  // Commit the tradeOrders to the stockbroking module of our vuex store
  store.commit(mutationTypes.SAVE_TRADE_ORDERS_TO_STORE, tradeOrders);

 }

 /**
  * Get current market data and commit it to the vuex store
  *
  */
 let getMarketData = () => {

  // obtain current market data
  const marketData = StbMockData.marketData;

  // commit the market data to the stockbroking module of our vue store
  store.commit(mutationTypes.SAVE_MARKET_DATA_TO_STORE, marketData);

 }



 export default {
   getTradeOrders,
   getMarketData
 }
