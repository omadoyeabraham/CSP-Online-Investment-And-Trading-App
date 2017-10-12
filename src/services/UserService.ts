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
 const getStbTotalValue = (stockbrokingData: object) => {
   return '150,000'
 }


/**
  * Calculate the total value of the user's fixed income portfolio
  *
  * @param fixedIncomeData  The user's FI data gotten from the vuex store
  * @return string
  */
const getFixedIncomeTotalValue = (stockbrokingData: object) => {
  return '150,000'
}

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


 export default {
   getStbTotalValue,
   getFixedIncomeTotalValue,
   getUserData
 }
