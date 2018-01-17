/**
 * This service handles all user related data tasks.
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 import * as ApiUrlService from '../services/ApiUrlService'
 import axios from 'axios'

 /**
  * Calculate the total value of the user's stockbroking portfolio
  *
  * @param stockbrokingData  The user's stb data gotten from the vuex store
  * @return string
  */
//  const getStbTotalValue = (stockbrokingData: object) => {
//    return '150,000'
//  }


/**
  * Calculate the total value of the user's fixed income portfolio
  *
  * @param fixedIncomeData  The user's FI data gotten from the vuex store
  * @return string
  */
// const getFixedIncomeTotalValue = (stockbrokingData: object) => {
//   return '150,000'
// }

/**
 * Get the customer's data [portfolios, holdings etc]
 */
const getUserData = (customerId) => {
  return axios({
    method: 'POST',
    url: ApiUrlService.GetCustomerData,
    data: {customerId: customerId}
  })
}

/**
 * Reset a user's password
 *
 * @param oldPassword
 * @param newPassword
 */
const resetPassword = (userID,oldPassword, newPassword) => {
  return axios({
    method: 'POST',
    url: ApiUrlService.ResetPassword,
    data: {customerId: userID, oldPassword: oldPassword, newPassword: newPassword}
  })
}

/**
 * Change a user's password
 *
 * @param userID
 * @param newPassword
 */
const changePassword = (userID, newPassword) => {
  return axios({
    method: 'POST',
    url: ApiUrlService.ChangePassword,
    data: { customerId: userID, newPassword: newPassword }
  })
}

/**
 * Send out the contact manager email from the portal
 * @param subject
 * @param message
 * @param accountManagerEmail
 * @return Promise
 */
const contactManager = (subject, message, accountManagerEmail,username) => {

  return axios({
    url: ApiUrlService.ContactManager,
    method: 'POST',
    data: {
      subject: subject,
      message: message,
      email: accountManagerEmail,
      userName: username
    }
  })

}


 export default {
   getUserData,
   resetPassword,
   changePassword,
   contactManager
 }
