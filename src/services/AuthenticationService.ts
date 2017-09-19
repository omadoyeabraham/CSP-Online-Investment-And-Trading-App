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

 /**
  * Login the user
  *
  * @param username: string  || The username entered by the user
  * @param password: string  || The password entered by the user
  */
 let login = (username: string, password: string) => {

  axios({
    method: 'post',
    url: ApiUrls.AuthenticationUrl,
    data: {'username': username, 'password': password}
    })
    .then((response) => {

      let userData = response.data;

      // Commit the authenticated user's data to the vue store.
      store.commit(mutationTypes.SAVE_AUTHENTICATED_USER_TO_STORE, userData);

      // Add authorization header to all future axios requests, until the user logs out
      axios.defaults.headers.common['Authorization'] = userData.customer.portalPasswordToken;

      // Redirect to the dashboard after successful authetication
      router.push({name: 'Dashboard'})
    })
    .catch((error) => {

      // return 'Invalid username or password';
    });


 } // EOF Login Fn


 // Export the methods from the authentication service
 export const AuthenticationService = {
   login: login
 }
