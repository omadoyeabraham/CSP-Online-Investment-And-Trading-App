/**
 * This service handles functionality related to cash accounts
 *
 */
import axios from 'axios'

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

// Utility service exposing various free-form functionalities
import UtilityService from './UtilityService'

import * as moment from 'moment'

/**
 * Change the selected naira cash account
 *
 * @param cashAccountID
 */
let changeSelectedNairaCashAccount = (cashAccountID: number, startDate = UtilityService.getDefaultCashStatementStartDate(),
                                      endDate = UtilityService.getDefaultCashStatementEndDate()) => {
  store.commit(mutationTypes.CHANGE_SELECTED_NAIRA_CASH_ACCOUNT, cashAccountID)

  // Get the cash statements again, since the cash account has been changed
  getNairaCashStatements(startDate, endDate)
 }

  /**
  * Change the selected dollar cash account
  *
  * @param cashAccountID
  */
let changeSelectedDollarCashAccount = (cashAccountID: number, startDate = UtilityService.getDefaultCashStatementStartDate(),
  endDate = UtilityService.getDefaultCashStatementEndDate()) => {
  store.commit(mutationTypes.CHANGE_SELECTED_DOLLAR_CASH_ACCOUNT, cashAccountID)

  // Get the cash statements again, since the cash account has been changed
  getDollarCashStatements(startDate, endDate)
}

 /**
  * Get the naira cash statements for the account selected by the user
  *
  */
 let getNairaCashStatements = (startDate = UtilityService.getDefaultCashStatementStartDate(), endDate = UtilityService.getDefaultCashStatementEndDate()) => {

  const cashAccountNumber = store.state.cash.selectedNairaCashAccount.name

    axios({
      method: 'POST',
      url: ApiUrls.GetCashAccountStatements,
      data: {
        accountNumber: cashAccountNumber,
        startDate: startDate,
        endDate: endDate
      }
    }).then((response) => {

      const responseData = response.data.item

      /**
       * Either a single object, or an array of objects will be returned.
       * This ensures that we always have an array of objects
       */
      let cashStatements = (responseData.constructor === Array) ? responseData : [responseData]

      store.commit(mutationTypes.SET_NAIRA_CASH_STATEMENTS, cashStatements)

    }).catch((response) => {

    })
 }


 /**
 * Get the dollar cash statements for the account selected by the user
 *
 */
 let getDollarCashStatements = (startDate = UtilityService.getDefaultCashStatementStartDate(), endDate = UtilityService.getDefaultCashStatementEndDate()) => {

   const cashAccountNumber = store.state.cash.selectedDollarCashAccount.name

   axios({
     method: 'POST',
     url: ApiUrls.GetCashAccountStatements,
     data: {
       accountNumber: cashAccountNumber,
       startDate: startDate,
       endDate: endDate
     }
   }).then((response) => {

     const responseData = response.data.item

     /**
      * Either a single object, or an array of objects will be returned.
      * This ensures that we always have an array of objects
      */
     let cashStatements = (responseData.constructor === Array) ? responseData : [responseData]

     store.commit(mutationTypes.SET_DOLLAR_CASH_STATEMENTS, cashStatements)

   }).catch((response) => {

   })
 }


/**
*  Get,compute and set the default cash account values (calculated from the first of the month till date) for all cash accounts owned by the user
This is so that we have the uncleared effects for all cash accounts when displaying the cash accounts overview

@returns void
*/
let setDefaultCashAccountValues = () => {
  let cashAccounts = store.state.cash.allCashAccountsDefaultValues
  const startDate = UtilityService.getDefaultCashStatementStartDate()
  const endDate = UtilityService.getDefaultCashStatementEndDate()
  const cashAccountNames = []
  const promises = []

  cashAccounts.forEach(cashAccount => {
    // Get the cash statements for the individual cash accounts for the default date range (1st till date)
    let promise = axios({
      method: 'POST',
      url: ApiUrls.GetCashAccountStatements,
      data: {
        accountNumber: cashAccount.name,
        startDate: startDate,
        endDate: endDate
      }
    })

    // Get the cashAccountNames and also an array of all the promises (resolving cash statements eventually)
    cashAccountNames.push(cashAccount.name)
    promises.push(promise)

  })

  /**
   * Wait for all promises to resolve before using the data
   */
  Promise.all(promises)
    .then(resolvedData => {
      let statementsData = []
      resolvedData.forEach((dataSet, index) => {

        /**
         * Either a single object, or an array of objects will be returned.
         * This ensures that we always have an array of objects
         */
        let cashStatements = (dataSet.data.item.constructor === Array) ? dataSet.data.item : [dataSet.data.item]
        statementsData.push({
          accountName: cashAccountNames[index],
          statements: cashStatements
        })
      })

      /**
       * Foreach cash account, using the default cash statements resolved from the promises above get the uncleared effects and other cash account related metrics, and add them (prepended with a csp) to the data returned by zanibal.
       */
      cashAccounts.forEach(cashAccount => {

        if(cashAccount.currency === 'NGN') {
          cashAccount.cspCurrencyCode = "'&#8358;'"
        } else if (cashAccount.currency === 'USD') {
          cashAccount.cspCurrencyCode = '&336;'
        } else {
          cashAccount.cspCurrencyCode = '&#835;'
        }

        let cashStatementData: any = statementsData.filter(initialStatement => {

          return initialStatement.accountName === cashAccount.name
        });

        let defaultCashData: any = getCashDataFromDefaultCashStatements(cashStatementData[0].statements)
        cashAccount.cspInitialUnclearedEffects = parseFloat(defaultCashData.unclearedEffects)
        // cashAccount.cspInitialTotalBalance = parseFloat(defaultCashData.unclearedEffects) + parseFloat(defaultCashData.)

      });


      // TODO.. This is a mutation of the store's state and as such should be moved to an appropriate mutator
      store.state.cash.allCashAccountsDefaultValues = cashAccounts
    }).catch((error) => {

    })
}

/**
 * Determine the total uncleared effects for cash statements generated during any period in time
 * @param  $cashStatements
 */
let getCashDataFromDefaultCashStatements = (cashStatements = []) => {
  let openingStatement = cashStatements[0]
  let closingStatement = cashStatements[cashStatements.length - 1]

  let openingBalance = 0
  let totalDebitAmount = 0
  let totalCreditAmount = 0
  let closingBalance = 0
  let unclearedEffects = 0
  let cashAvailable = 0

  // On intial Load, the cashStatement is not set, catch this and return []
  if (openingStatement === undefined) {
    return []
  }

  /**
   * Calculating the opening balance
   *  - If there is a debit entry in the statement, add it to the current balance to get the opening balance. This is because the debited amount has been debited (taken out) of the opening balance to
   * arrive at the current balance
   *  - Else subtract the creditAmount (amount added to the initial balance) from the current balance to get the initial balance
   */
  if (parseFloat(openingStatement.debitAmount) > 0) {
    openingBalance = parseFloat(openingStatement.balance) + parseFloat(openingStatement.debitAmount)
  } else {
    openingBalance = parseFloat(openingStatement.balance) - parseFloat(openingStatement.creditAmount)
  }

  // calculating the total amount debited
  cashStatements.forEach((cashStatement) => {
    totalDebitAmount += parseFloat(cashStatement.debitAmount)
  })

  // calculating the total amount credited
  cashStatements.forEach((cashStatement) => {
    totalCreditAmount += parseFloat(cashStatement.creditAmount)
  })

  // Closing Balance
  closingBalance = parseFloat(closingStatement.balance)

  // UnclearedEffects and unclearedBalance
  let unclearedEffectsStatements = getUnclearedEffectsFromDefaultCashStatements(cashStatements)
  unclearedEffectsStatements.forEach((unclearedEffect) => {
    unclearedEffects += parseFloat(unclearedEffect.creditAmount)
  })

  // Cash Available = Most recent balance - uncleared balance (i.e uncleared effects)
  cashAvailable = parseFloat(closingStatement.balance) - unclearedEffects
  // debugger
  return {
    openingBalance,
    totalDebitAmount,
    totalCreditAmount,
    closingBalance,
    unclearedEffects,
    cashAvailable
  }

}

/**
 * Return the cash statements which elucidate 'uncleared effects' from the default pool of cash statements gotten for a cash account.
 *
 * Uncleared effects are transactions that have a value date greater than the endDate in
 *  the current search range. I.E. as at the endDate of the search these transactions had not yet settled (T+3) and are hence uncleared
 *
 * @param defaultCashStatements
 * @return Array
 */
let getUnclearedEffectsFromDefaultCashStatements = (defaultCashStatements = []) => {
  let cashStatements = defaultCashStatements
  let unclearedAmount = 0
  const startDate = UtilityService.getDefaultCashStatementStartDate()
  const endDate = UtilityService.getDefaultCashStatementEndDate()

  let unclearedEffects = cashStatements.filter((cashStatement) => {

    let valueDate = moment(cashStatement.valueDate, 'YYYY-MM-DD')
    let searchEndDate = moment(endDate, 'YYYY-MM-DD')

    if (searchEndDate.isBefore(valueDate)) {
      unclearedAmount = (parseFloat(cashStatement.debitAmount) === 0.00) ?
        parseFloat(cashStatement.creditAmount) : parseFloat(cashStatement.debitAmount)
      cashStatement.unclearedAmount = unclearedAmount
    }

    return searchEndDate.isBefore(valueDate)
  })

  return unclearedEffects
}



 export default {
   changeSelectedNairaCashAccount,
   getNairaCashStatements,
   changeSelectedDollarCashAccount,
   getDollarCashStatements,
   setDefaultCashAccountValues,
 }
