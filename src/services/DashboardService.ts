/**
 * This service handles all data related tasks for the dashboard
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

import axios from 'axios';

// Interface defining the structure of market highlight data
import MarketHighlights from '../models/dashboard/MarketHighlights';

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

/**
 * Gets all data for the dashboard from the API, and commits it to the vuex store
 */
export let getDashboardData = () => {

  // Get the data from the Backend
  axios({
    method: 'GET',
    url: ApiUrls.GetDashboardDataUrl
  }).then((response) => {
      const dashboardData = response.data

      // commit the dashboard data to the vuex store
      store.commit(mutationTypes.SAVE_DASHBOARD_DATA_TO_STORE, dashboardData)

  }).catch((error) => {

  })
}
