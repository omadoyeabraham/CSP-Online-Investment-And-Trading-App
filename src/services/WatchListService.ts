/**
 * This service handles all watchlist related services
 *
 */

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

import axios from 'axios'

// The vuex store instance
import store from '../store';

let userID = store.state.user.info.id;

/**
 * Get a user's entire watchlist
 */
let getWatchList = () => {
  return axios({
    method: 'GET',
    url: `${ApiUrls.GetWatchListUrl}/${userID}`
  })
}

/**
 * Create a new watchList item for the user
 */
let createWatchList = (newWatchListItem: object) => {
  return axios({
    method: 'POST',
    url: `${ApiUrls.CreateWatchListUrl}`,
    data: newWatchListItem
  })
}

/**
 * Update the selected watchlist
 */
let updateWatchList = () => {

}

/**
 * Delete a watchlist item
 */
let deleteWatchList = (watchlistId: number, customerId: number) => {
  return axios({
    method: 'POST',
    url: ApiUrls.DeleteWatchListUrl,
    data: {watchlistId: watchlistId, customerId: customerId}
  })
}

/**
 * Toggle the status of a watchlist between enabled and disabled
 *
 * @param watchlistStatus 0 == disabled, 1 == enabled
 * @param customerId
 */
let toggleWatchList = (watchListStatus: any, customerId: number, watchlistId: number) => {
  console.log(watchListStatus, watchlistId, customerId)
  return axios ({
    method: 'POST',
    url: ApiUrls.ToggleWatchListUrl,
    data: {status: watchListStatus, customerId: customerId, watchlistId: watchlistId}
  })
}


export default {
  getWatchList,
  createWatchList,
  updateWatchList,
  toggleWatchList,
  deleteWatchList
}
