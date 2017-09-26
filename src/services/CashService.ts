/**
 * This service handles functionality related to cash accounts
 *
 */

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

/**
 * Change the selected cash account ID
 *
 * @param cashAccountID
 */
 let changeSelectedNairaCashAccount = (cashAccountID: number) => {
  store.commit(mutationTypes.CHANGE_SELECTED_CASH_ACCOUNT, cashAccountID)
 }



 export default {
   changeSelectedNairaCashAccount
 }
