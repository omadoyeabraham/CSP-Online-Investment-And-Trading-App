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

  return axios({
    method: 'post',
    url: ApiUrls.AuthenticationUrl,
    data: {'username': username, 'password': password}
    })

 } // EOF Login Fn

 /**
  * Logout the user
  */
 let logout = (customerId) => {
  // Clear the data saved in local storage
  // window.sessionStorage.clear()

  // Clear the stb store before logging in
  // store.commit(mutationTypes.CLEAR_STOCKBROKING_STORE)

  return axios({
    method: 'POST',
    url: ApiUrls.LogoutUrl,
    data: { customerId: customerId }
  })

 }

 let findUserByUsername = (username: string) => {
   return axios({
     method: 'post',
     url: ApiUrls.FindUserByUsername,
     data: { 'username': username }
   })
 }

 let sendPasswordResetLink = (username: string, email: string, userId: number) => {
   return axios({
     method: 'post',
     url: ApiUrls.SendPasswordResetLink,
     data: {
       'username': username,
       'email': email,
       'user_id': userId
      }
   })
 }

 /**
  * Ascertain that the password reset link sent to a user is still valid
  * @param resetLink {string} The reset code sent to a client
  * @return promise
  */
 let verifyPasswordResetCode = (resetCode: string = "") => {
  return axios({
    method: 'post',
    url: ApiUrls.VerifyPasswordResetCode,
    data: {
      resetCode: resetCode
    }
  })
 }


 // Export the methods from the authentication service
 export const AuthenticationService = {
   login: login,
   logout: logout,
   findUserByUsername: findUserByUsername,
   sendPasswordResetLink: sendPasswordResetLink,
   verifyPasswordResetCode: verifyPasswordResetCode
 }
