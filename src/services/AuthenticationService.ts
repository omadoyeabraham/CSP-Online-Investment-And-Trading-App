/**
 * This service handles authentication for the cardinalstone tradedirect portal
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

import axios from 'axios';

// Router instance for the apllication
import router from '../router';

 const loginUrl = 'https://restserver.cardinalstone.com/api/findCustomerByName';
 // const loginUrl = 'http://192.168.5.111/nexus/customer.php';

 /**
  * Login the user
  *
  * @param username: string  || The username entered by the user
  * @param password: string  || The password entered by the user
  */
 let login = (username: string, password: string) => {

  axios({
    method: 'post',
    url: loginUrl,
    data: {'username': username, 'password': password}
  })
  .then((response) => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  });

  router.push('dashboard')

 }


 // Export the methods from the authentication service
 export const AuthenticationService = {
   login: login
 }
