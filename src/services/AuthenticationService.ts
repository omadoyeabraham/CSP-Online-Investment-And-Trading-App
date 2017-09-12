/**
 * This service handles authentication for the cardinalstone tradedirect portal
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

import axios from 'axios';

 const loginUrl = 'https://restserver.cardinalstone.com/api/findCustomerByName/demo1/csp_1234';

 /**
  * Login the user
  *
  * @param username: string  || The username entered by the user
  * @param password: string  || The password entered by the user
  */
 let login = (username: string, password: string) => {
  axios.get(loginUrl)
    .then((response) => {
      console.log(response)
    })
    .catch(error => {
      console.log("There was an error")
    })
 }


 // Export the methods from the authentication service
 export const AuthenticationService = {
   login: login
 }
