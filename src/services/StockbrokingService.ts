/**
 * This service handles all services related to stockbroking
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 import axios from 'axios'
 import _ from 'lodash'
 import moment from 'moment'

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
  let tradeOrders = []
  let userID = store.state.user.info.id;

  axios({
    method: 'GET',
    url: `${ApiUrls.GetTradeOrdersUrl}/${userID}/${cacheStatus}`,
    data: {id: userID}
  }).then((response) => {

    if(response.data.item !== undefined) {
      tradeOrders = response.data.item

      // Loop through each trade order and determine if it can be cancelled
      tradeOrders.forEach((tradeOrder) => {
        tradeOrder.canBeCancelled = tradeOrderCanBeCancelled(tradeOrder)
        tradeOrder.isBooked = tradeOrderIsBooked(tradeOrder)
        tradeOrder.cspOrderStatus = getTradeOrderCspStatus(tradeOrder)
      })
    }

    // Commit the tradeOrders to the stockbroking module of our vuex store
    store.commit(mutationTypes.SAVE_TRADE_ORDERS_TO_STORE, tradeOrders);
  })


 }

 /**
  * Determine if a trade order can be cancelled or not.

  * @param tradeOrder | Object
  * @return Boolean
  */
 let tradeOrderCanBeCancelled = (tradeOrder) => {
   return tradeOrder.orderStatus == "BOOKED" ||
     (tradeOrder.fixOrderStatus == "NEW" && tradeOrder.orderStatus == "EXECUTING") ||
     (tradeOrder.fixOrderStatus == "REPLACED" && tradeOrder.orderStatus == "EXECUTING") ||
     (tradeOrder.fixOrderStatus == "REJECTED" && tradeOrder.orderStatus == "EXECUTING") ||
     (tradeOrder.fixOrderStatus == "NA" && tradeOrder.orderStatus == "EXECUTING");
 }

 /**
  * Determine if a trade order has been booked
  *
  * @param tradeOrder | Object
  */
 let tradeOrderIsBooked = (tradeOrder) => {
   return tradeOrder.orderStatus == "BOOKED" ||
     (tradeOrder.fixOrderStatus == "NA" && tradeOrder.orderStatus == "EXECUTING") ||
     (tradeOrder.fixOrderStatus == "REJECTED" && tradeOrder.orderStatus == "EXECUTING")
 }

 /**
  * Return an order Status for a trade order based on Zanibal's trade order status and the fix order status
  * @param tradeOrder | Object
  * @return string
  */
 let getTradeOrderCspStatus = (tradeOrder) => {
   if ((tradeOrder.orderStatus == "EXECUTING") && (tradeOrder.fixOrderStatus == "PARTIALLY_FILLED")) {
    return 'PARTIALLY FILLED'
   }

   if (((tradeOrder.fixOrderStatus == 'NEW') || (tradeOrder.fixOrderStatus == 'REPLACED')) && (tradeOrder.orderStatus == 'EXECUTING')) {
      return 'EXECUTING'
   }

   if (tradeOrder.isBooked) {
     return 'PENDING'
   }

   if ((tradeOrder.orderStatus == "EXECUTING") && (tradeOrder.fixOrderStatus == "FILLED")) {
     return "EXECUTED"
   }

   return tradeOrder.orderStatus
 }

 /**
  * Get current market data and commit it to the vuex store
  *
  */
 let getMarketData = () => {

   return axios({
     method: 'GET',
     url: ApiUrls.GetMarketDataUrl
   })

 }


/**
 * Used to calculate the changes instocks and commit market data to the store
 *
 * @param marketData
 */
let commitMarketData = (allMarketData) => {
  allMarketData.forEach((stockData) => {
       let priceChange = stockData.lastTradePrice - stockData.previousClose
       let priceChangePercent = (priceChange / stockData.previousClose ) * 100

      stockData.priceChange = priceChange
      stockData.percentChange = priceChangePercent
  })

  // commit the market data to the stockbroking module of our vue store
  store.commit(mutationTypes.SAVE_MARKET_DATA_TO_STORE, allMarketData)
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

  return axios({
    method: 'GET',
    url: `${ApiUrls.GetSecurityMarketSnapShot}/${newlySelectedSecurity}`

  })
 }

 /**
  * Set the security market snapshot data after it is gotten from the API call
  *
  * @param snapShotData
  */
 let setSecurityMarketSnapShot = (snapShotData) => {
   let marketSnapShot = snapShotData

   // Calculating bids
   let bidLevels = (marketSnapShot && marketSnapShot.bidLevels) ? (marketSnapShot.bidLevels) : []
   let bids = []
   let bidsTotal = 0
   let companyName = marketSnapShot ? (marketSnapShot.companyName) : ''
   let valueTraded = marketSnapShot ? marketSnapShot.valueTraded : ''

   bidLevels.forEach((bidLevel, index) => {
     bidLevel.id = ++index
     bidLevel.total = bidsTotal + parseFloat(bidLevel.qty)
     bidsTotal = bidLevel.total
     bids.push(bidLevel)
   })

   // Calculating offers
   let offerLevels = (marketSnapShot && marketSnapShot.offerLevels) ? marketSnapShot.offerLevels : []
   let offers = []
   let offersTotal = 0

   offerLevels.forEach((offerLevel, index) => {
     offerLevel.id = ++index
     offerLevel.total = offersTotal + parseFloat(offerLevel.qty)
     offersTotal = offerLevel.total
     offers.push(offerLevel)
   })

   // Getting trades and price movements
   let trades = (marketSnapShot && marketSnapShot.trades) ? marketSnapShot.trades : []
   let priceMovements = []

   trades.forEach((trade, index) => {
     trade.id = ++index
     let date = moment(trade.time).format('HH:mm:ss')

     let priceMovement = {
       id: ++index,
       date: date,
       price: trade.tradePrice
     }

     priceMovements.push(priceMovement)
   })

   // So the graph is plotted in the correct order
   priceMovements.reverse()

   let currentMarketData = {
     bids,
     offers,
     trades,
     priceMovements,
     companyName,
     valueTraded
   }

   store.commit(mutationTypes.SAVE_SELECTED_SECURITY_MARKET_SNAPSHOT, currentMarketData)
 }

 /**
  * Get the data for the status box on the trade page
  *
  * @param securityID
  */
 let getSecurityStatusInfo = (securityName: any) => {

    axios({
      method: 'GET',
      url: `${ApiUrls.GetSecurityStatusInfo}/${securityName}`
    }).then((response) => {

      let statusInfo = response.data
      store.commit(mutationTypes.SAVE_SELECTED_SECURITY_STATUS_INFO, statusInfo)
    }).catch((error) => {
      console.log(error)
    })

 }

 /**
  * Reset all the data on the STB market snapshot component
  */
 let resetMarketSnapShot = () => {
   store.commit(mutationTypes.RESET_MARKET_SNAPSHOT)
 }

 /**
  * Preview a trade order request and get the tradeorder total
  *
  * @param tradeOrder
  * @return Promise
  */
 let previewTradeOrder = (tradeOrder: object) => {

  return axios({
    method: 'POST',
    url: `${ApiUrls.PreviewTradeOrder}`,
    data: tradeOrder
  })

 }


 /**
  * Place a trade order on the floor of the NSE
  *
  * @param tradeOrder
  * @return Promise
  */
 let createTradeOrder = (tradeOrder: object) => {

  return axios({
    method: 'POST',
    url: `${ApiUrls.CreateTradeOrder}`,
    data: tradeOrder
  })

 }

 /**
  * Cancel a trade order
  *
  * @param tradeOrderID
  */
 let cancelTradeOrder = (tradeOrderID) => {
  return axios({
    method: 'POST',
    url: ApiUrls.CancelTradeOrder,
    data: {id: tradeOrderID}
  })
 }


 export default {
   getTradeOrders,
   getMarketData,
   commitMarketData,
   setCurrentPortfolio,
   getActiveTradeOrderTerms,
   getSecurityNames,
   getSecurityMarketSnapShot,
   setSecurityMarketSnapShot,
   getSecurityStatusInfo,
   resetMarketSnapShot,
   previewTradeOrder,
   createTradeOrder,
   cancelTradeOrder
 }
