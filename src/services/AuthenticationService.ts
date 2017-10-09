/**
 * This service handles authentication for the cardinalstone tradedirect portal
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

import axios from 'axios';

// Router instance for the apllication
import router from '../router';

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

import StockbrokingService from './StockbrokingService'

 /**
  * Login the user
  *
  * @param username: string  || The username entered by the user
  * @param password: string  || The password entered by the user
  */
 let login = (username: string, password: string) => {

  // Clear previously saved data before logging into the system again
  window.sessionStorage.clear()

  return axios({
    method: 'post',
    url: ApiUrls.AuthenticationUrl,
    data: {'username': username, 'password': password}
    })

 } // EOF Login Fn


 // Export the methods from the authentication service
 export const AuthenticationService = {
   login: login
 }
