/**
 * This service handles account funding API calls.
 *
 */

import axios from 'axios';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

/**
 * Get the payment transaction details required to be sent to Nibbs
 */
let getPaymentTransactionDetails = (paymentData: Object) => {
  console.log(paymentData)

  return axios({
    method: 'POST',
    url: ApiUrls.GetPaymentTransactionDetails,
    data: paymentData
  })
}


export const AccountFundingService = {
  getPaymentTransactionDetails
}
