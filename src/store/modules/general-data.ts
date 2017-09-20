/**
 * Store for data that does not fit into the other store categories
 *
 */

 // All mutation types that can be carried out on the store state by the application
 import * as mutationTypes from '../mutation-types.js';

// Initial state
const state = {
  newsFeed: []
}

// Getters
const getters = {

  // Return the news feed on dashboard
  newsFeed: (state) => {
    const data = []

    // Get the first 5 news items, and pick only necessary fields
    state.newsFeed.slice(0, 5).forEach((newsItem) => {
      data.push({
        title: newsItem.title,
        link: newsItem.link
      })
    })

    return data
  }

}

// Mutations
const mutations = {
  [mutationTypes.SAVE_NEWSFEED_TO_STORE] (state, dashboardData) {
     state.newsFeed = dashboardData.BUSINESSNEWS.item
   }
}


export default {
  state,
  getters,
  mutations
}
