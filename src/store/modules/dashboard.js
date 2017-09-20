/**
 * The dashboard store houses the state, getters, mutators and
 * actions for data specific to the dashboard.
 *
 *@author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 // All mutation types that can be carried out on the store state by the application
 // import * as mutationTypes from '../mutation-types.js';

 // Initial state
 const state = {
   nseAsi: [],
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
  //  [mutationTypes.SAVE_DASHBOARD_DATA_TO_STORE] (state, dashboardData) {
  //    state.newsFeed = dashboardData.BUSINESSNEWS.item
  //    state.marketHighlights = dashboardData.MARKETHIGHLIGHTS
  //    state.nseAsi = dashboardData.NSEASI
  //    state.topGainers = dashboardData.TOPGAINERS.item
  //    state.topLosers = dashboardData.TOPLOSERS.item
  //  }
 }

 export default {
   state,
   getters,
   mutations
 }
