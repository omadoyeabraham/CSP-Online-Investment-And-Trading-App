/**
 * This service handles all services related to stockbroking
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 import axios from 'axios'

 // Data mocks to be replaced with actual API calls
 import StbMockData from '../data-mocks/stockbroking'

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';


/**
 * Get all trade orders that the authenticated user has placed and commit it to the vuex store
 *
 * @param cacheStatus: number | Determines if we need cached data or fresh data from the server
 * @return void
 */
 let getTradeOrders = (cacheStatus: number) => {

   // obtain the tradeorders already placed by the user
  let tradeOrders =  StbMockData.tradeOrders;

  let userID = store.state.user.info.id;

  axios({
    method: 'GET',
    url: `${ApiUrls.GetTradeOrdersUrl}/${userID}/${cacheStatus}`,
    data: {id: userID}
  }).then((response) => {
    console.log(response)
  })

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

  axios({
    method: 'GET',
    url: ApiUrls.GetMarketDataUrl
  })
  .then((response) => {

    // commit the market data to the stockbroking module of our vue store
    store.commit(mutationTypes.SAVE_MARKET_DATA_TO_STORE, response.data)

  })

 }

 /**
  * Set the current portfolio from the dropdown
  *
  * @param accountNo
  */
 let setCurrentPortfolio = (accountNo: string) => {
  store.commit(mutationTypes.CHANGE_CURRENT_PORTFOLIO, accountNo)

 }



 export default {
   getTradeOrders,
   getMarketData,
   setCurrentPortfolio
 }
