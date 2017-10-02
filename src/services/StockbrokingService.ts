/**
 * This service handles all services related to stockbroking
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 import axios from 'axios'
 import _ from 'lodash'

 // Data mocks to be replaced with actual API calls
 import StbMockData from '../data-mocks/stockbroking'

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

/**
 * Get the total value of the user's stockbroking portfolio
 */
let getStockbrokingTotalValue = (stbData) => {
  store.commit(mutationTypes.SET_STOCKBROKING_TOTAL_VALUE, '234,600')
}

/**
 * Get all trade orders that the authenticated user has placed and commit it to the vuex store
 *
 * @param cacheStatus: number | Determines if we need cached data or fresh data from the server
 * @return void
 */
 let getTradeOrders = (cacheStatus: number) => {

   // obtain the tradeorders already placed by the user
  // let tradeOrders =  StbMockData.tradeOrders;
  console.log('called getTradeOrders')
  let tradeOrders = []
  let userID = store.state.user.info.id;

  axios({
    method: 'GET',
    url: `${ApiUrls.GetTradeOrdersUrl}/${userID}/${cacheStatus}`,
    data: {id: userID}
  }).then((response) => {

    if(response.data.item !== undefined) {
      tradeOrders = response.data.item
    }

    // Commit the tradeOrders to the stockbroking module of our vuex store
    store.commit(mutationTypes.SAVE_TRADE_ORDERS_TO_STORE, tradeOrders);
  })


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

 /**
  * Get and set the active trade order terms
  *
  */
 let getActiveTradeOrderTerms = () => {

  axios({
    method: 'GET',
    url: ApiUrls.GetTradeOrderTerms
  }).then((response) => {

    let orderTerms = response.data.item
    orderTerms = _.orderBy(orderTerms, ['defLifeTime'], ['asc'])

    store.commit(mutationTypes.SAVE_TRADE_ORDER_TERMS, orderTerms)

  })

 }

 /**
  * Returns a list of all securities trading on the floor of the NSE
  *
  */
 let getSecurityNames = () => {

  axios({
    method: 'GET',
    url: ApiUrls.GetSecurityNames
  }).then((response) => {

    let securityNames = response.data

    store.commit(mutationTypes.SAVE_SECURITY_NAMES, securityNames)
  })
 }

 /**
  * Returns the market data for a stock selected on the trade page
  *
  */
 let getSecurityMarketSnapShot = (newlySelectedSecurity) => {

  // axios({
  //   method: 'GET',
  //   url: `${ApiUrls.GetSecurityMarketSnapShot}${newlySelectedSecurity}`
  // }).then((response) => {
  //   console.log(response)
  // })

  let marketSnapShot = StbMockData.marketSnapShot

  // Calculating bids
  let bidLevels = marketSnapShot.bidLevels ? (marketSnapShot.bidLevels) : []
  let bids = []
  let bidsTotal = 0

  bidLevels.forEach((bidLevel, index) => {
    bidLevel.id = ++index
    bidLevel.total = bidsTotal + parseFloat(bidLevel.qty)
    bidsTotal = bidLevel.total
    bids.push(bidLevel)
  })

  // Calculating offers
  let offerLevels = (marketSnapShot.offerLevels) ? marketSnapShot.offerLevels : []
  let offers = []
  let offersTotal = 0

  offerLevels.forEach((offerLevel, index) => {
    offerLevel.id = ++index
    offerLevel.total = offersTotal + parseFloat(offerLevel.qty)
    offersTotal = offerLevel.total
    offers.push(offerLevel)
  })

  // Getting trades and price movements
  let trades = (marketSnapShot.trades) ? marketSnapShot.trades : []
  let priceMovements = []

  trades.forEach((trade, index) => {
    trade.id = ++index

    let priceMovement = {
      id: ++index,
      date: trade.date,
      price: trade.tradePrice
    }

    priceMovements.push(priceMovement)
  })

  // So the graph is plotted in the correct order
  priceMovements.reverse()





  return {
    bids,
    offers,
    trades,
    priceMovements
  }

 }

 /**
  * Preview a trade order request and get the tradeorder total
  *
  * @param tradeOrder
  */
 let previewTradeOrder = (tradeOrder: object) => {
  console.log(tradeOrder)
 }


 export default {
   getTradeOrders,
   getMarketData,
   setCurrentPortfolio,
   getActiveTradeOrderTerms,
   getSecurityNames,
   getSecurityMarketSnapShot,
   previewTradeOrder,
   getStockbrokingTotalValue
 }
