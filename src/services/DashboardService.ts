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
 * Returns the data for the market highlights part of the dashboard
 *
 * @return
 */
export function getMarketHighlights()
{
  let marketHighlights = [
    {
      label: 'All Share Index',
      value: '35,550.79'
    },
    {
      label: 'All Share Index Change',
      value: -1.69
    },
    {
      label: 'Market Cap',
      value: '11,234,786,324.88',
    },
    {
      label: 'Volume Traded',
      value: '215,900,489.34'
    },
    {
      label: 'Value Traded',
      value: '2,398,443,980,90'
    },
    {
      label: 'No Of Deals',
      value: '4200'
    }
  ];

  return marketHighlights;
}

/**
 * Gets all data for the dashboard from the API, and commits it to the vuex store
 */
export let getDashboardData = () => {

  // Get the data from the Backend
  axios({
    method: 'GET',
    url: ApiUrls.GetDashboardDataUrl
  }).then((response) => {
    console.group()
    console.error('The get dashboard data was called')
    console.log(response)
    console.groupEnd()
  }).catch((error) => {

  })
}
