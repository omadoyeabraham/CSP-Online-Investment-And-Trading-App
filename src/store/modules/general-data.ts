/**
 * Store for data that does not fit into the other store categories
 *
 */

 // All mutation types that can be carried out on the store state by the application
 import * as mutationTypes from '../mutation-types.js';

// Initial state
const state = {
  newsFeed: [],
  foreignExchange: {}
}

// Getters
const getters = {

  // Return the news feed on dashboard
  newsFeed: (state) => {
    const data = []

    // Get the first 5 news items, and pick only necessary fields
    // state.newsFeed.slice(0, 8).forEach((newsItem) => {
    state.newsFeed.forEach((newsItem) => {
      data.push({
        title: newsItem.title,
        link: newsItem.link
      })
    })

    return data
  },

  /**
   *
   */
  foreignExchange: (state) => {
    const data = [
      { label: 'NGN/USD', value: state.foreignExchange.USDRate, imgClass: 'usd-flag' },
      { label: 'NGN/GBP', value: state.foreignExchange.GBPRate, imgClass: 'gbp-flag' },
      { label: 'NGN/EUR', value: state.foreignExchange.EURRate, imgClass: 'eur-flag' },
      { label: 'NGN/CNY', value: state.foreignExchange.CNYRate, imgClass: 'cny-flag' },
      { label: 'NGN/AUD', value: state.foreignExchange.AUDRate, imgClass: 'aud-flag' }
    ]
    return data;
  }

}

// Mutations
const mutations = {
  [mutationTypes.SAVE_NEWSFEED_TO_STORE] (state, dashboardData) {
     state.newsFeed = dashboardData.BUSINESSNEWS.item
     state.foreignExchange = dashboardData.FOREIGNEXCHANGE
   }
}


export default {
  state,
  getters,
  mutations
}
