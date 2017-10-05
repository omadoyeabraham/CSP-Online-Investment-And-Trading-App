
// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../../mutation-types.js';

import _ from 'lodash'
import moment from 'moment'

import UserService from '../../../services/UserService';

const getters = {

  /**
   * Return the number of cash accounts that the user has
   */
  getTotalNumberOfCashAccounts: (state) => {

    if ((state.userData.NGN === undefined)) {
      return 0
    }

    return (state.userData.NGN.length) + (state.userData.USD.length)
  },

  /**
   * Returns the total number of naira cash accounts owned by the user
   */
  getTotalNumberOfNairaCashAccounts: (state) => {
    if ((state.userData.NGN === undefined)) {
      return 0
    }

    return (state.userData.NGN.length)
  },

  /**
   * Returns the total number of dollar cash accounts owned by the user
   */
  getTotalNumberOfDollarCashAccounts: (state) => {
    if ((state.userData.USD === undefined)) {
      return 0
    }

    return (state.userData.USD.length)
  },

  /**
   * Returns the naira cash accounts owned by the user
   */
  getNairaCashAccounts: (state) => {
    if ((state.userData.NGN === undefined)) {
      return []
    }

    return state.userData.NGN
  },

  /**
   * Returns the naira cash accounts formatted in the proper way for rendering using v-selects
   */
  getNairaCashAccountsForAccountFunding: (state) => {
    if ((state.userData.NGN === undefined)) {
      return []
    }

    let nairaCashAccounts = []

    state.userData.NGN.forEach((cashAccount) => {
      nairaCashAccounts.push({
        id: cashAccount.id,
        companyName: cashAccount.companyName,
        text: cashAccount.label,
        value: cashAccount.name
      })
    })

    return nairaCashAccounts
  },

  /**
   * Returns the dollar cash accounts owned by the user
   */
  getDollarCashAccounts: (state) => {
    if ((state.userData.USD === undefined)) {
      return []
    }

    return state.userData.USD
  },

  /**
   * Returns all cash accounts owned by the user
   */
  getAllCashAccounts: (state) => {

    if ((state.userData.NGN === undefined)) {
      return []
    }
    return _.union(state.userData.NGN, state.userData.USD)
  },

  /**
   * Return the cash statements (which might have been filtered by date) for the current
   * naira cash account selected
   *
   */
  getNairaCashStatements: (state) => {
    return state.nairaCashStatements
  },

  /**
   * Return the cash statements (which might have been filtered by date) for the current
   * dollar cash account selected
   *
   */
  getDollarCashStatements: (state) => {
    return state.dollarCashStatements
  },

  /**
   * Return all uncleared effects in the selected naira cash account
   *
   * Uncleared effects are transactions that have a value date greater than the endDate in
   * the current search range. I.E. as at the endDate of the search these transactions had not yet settled (T+3) and are hence uncleared
   */
  getNairaUnclearedEffects: (state, getters) => {
    let cashStatements = state.nairaCashStatements
    let unclearedAmount = 0
    const startDate = state.nairaSearchStartDate
    const endDate = state.nairaSearchEndDate

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

  },

  /**
   * Return all uncleared effects in the selected dollar cash account
   *
   * Uncleared effects are transactions that have a value date greater than the endDate in
   * the current search range. I.E. as at the endDate of the search these transactions had not yet settled (T+3) and are hence uncleared
   */
  getDollarUnclearedEffects: (state, getters) => {
    let cashStatements = state.dollarCashStatements
    let unclearedAmount = 0
    const startDate = state.dollarSearchStartDate
    const endDate = state.dollarSearchEndDate

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

  },

  /**
   * Returns data computed from the nairaCashStatements used to populate the statement summary box
   *
   */
  getNairaCashStatementSummary: (state, getters) => {

    let cashStatements = state.nairaCashStatements
    let openingStatement = cashStatements[0]
    let closingStatement = cashStatements[cashStatements.length - 1]

    let openingBalance = 0
    let totalDebitAmount = 0
    let totalCreditAmount = 0
    let closingBalance = 0
    let unclearedEffects = 0
    let cashAvailable = 0

    // On intial Load, the cashStatement is not set, catch this and return []
    if(openingStatement === undefined) {
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
    getters.getNairaUnclearedEffects.forEach((unclearedEffect) => {
      unclearedEffects += parseFloat(unclearedEffect.creditAmount)
    })

    // Cash Available = Most recent balance - uncleared balance (i.e uncleared effects)
    cashAvailable = parseFloat(closingStatement.balance) - unclearedEffects

    return {
      openingBalance,
      totalDebitAmount,
      totalCreditAmount,
      closingBalance,
      unclearedEffects,
      cashAvailable
    }

  },

    /**
     * Returns data computed from the dollarCashStatements used to populate the statement summary box
     *
     */
  getDollarCashStatementSummary: (state, getters) => {

    let cashStatements = state.dollarCashStatements
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
    getters.getDollarUnclearedEffects.forEach((unclearedEffect) => {
      unclearedEffects += parseFloat(unclearedEffect.creditAmount)
    })

    // Cash Available = Most recent balance - uncleared balance (i.e uncleared effects)
    cashAvailable = parseFloat(closingStatement.balance) - unclearedEffects

    return {
      openingBalance,
      totalDebitAmount,
      totalCreditAmount,
      closingBalance,
      unclearedEffects,
      cashAvailable
    }

  },

  /**
   * Get the total cash balance Naira Investments, excluding SMA cash accounts
   *
   */
  getTotalNairaCashBalance: (state, getters) => {
    let nairaCashAccounts = getters.getNairaCashAccounts
    let totalNairaCashBalance = 0

    nairaCashAccounts.forEach((nairaCashAccount) => {

      // Only add the balances from non SMA accounts
      if (nairaCashAccount.label.indexOf('(SMA)') === -1) {
        totalNairaCashBalance += parseFloat(nairaCashAccount.unClearedBalance)
      }

    })

    return totalNairaCashBalance

  },

  /**
 * Get the total cash balance for SMA Naira Investments
 *
 */
  getTotalNairaSmaCashBalance: (state, getters) => {
    let nairaCashAccounts = getters.getNairaCashAccounts
    let totalNairaSmaCashBalance = 0

    nairaCashAccounts.forEach((nairaCashAccount) => {

      // Only add the balances from non SMA accounts
      if (nairaCashAccount.label.indexOf('(SMA)') !== -1) {
        totalNairaSmaCashBalance += parseFloat(nairaCashAccount.unClearedBalance)
      }

    })

    return totalNairaSmaCashBalance

  },

    /**
   * Get the total cash balance for Dollar Investments
   *
   */
  getTotalDollarCashBalance: (state, getters) => {
    let dollarCashAccounts = getters.getDollarCashAccounts
    let totalDollarCashBalance = 0

    dollarCashAccounts.forEach((dollarCashAccount) => {
      totalDollarCashBalance += parseFloat(dollarCashAccount.unClearedBalance)
    })

    return totalDollarCashBalance

  }

}

export default getters
