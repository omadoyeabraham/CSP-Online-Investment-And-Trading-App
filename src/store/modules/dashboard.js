/**
 * The dashboard store houses the state, getters, mutators and
 * actions for data specific to the dashboard.
 *
 *@author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 import {TOGGLE_SIDEBAR} from '../mutation-types.js';

 import {newsFeed} from '../../services/NewsFeedService';

 // Initial state
 const state = {
   sidebarVisibility: true,
   chartData: {
     chart: {
       type: 'area'
     },
     title: {
       text: ''
     },
     xAxis: {
       categories: ['20-AUG-2017', '21-AUG-2017', '22-AUG-2017', '23-AUG-2017', '25-AUG-2017']
     },
     yAxis: {
       title: {
         text: ''
       }
     },
     series: [{
       name: ' ',
       data: [1, 2, 4, 3, 5],
       showInLegend: false
     }],
     credits: {
       enabled: false
     },
     plotOptions: {
       area: {
         fillOpacity: 0.6
       }
     }
   },
   newsFeed: newsFeed
 }

 // Getters
 const getters = {
   newsFeed: (state) => state.newsFeed
 }

 // Mutations
 const mutations = {
   [TOGGLE_SIDEBAR] (state) {
     state.sidebarVisibility = !state.sidebarVisibility
   }
 }

 export default {
   state,
   getters,
   mutations
 }
