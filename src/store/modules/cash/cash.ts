
// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../../mutation-types.js';

import _ from 'lodash'
import moment from 'moment'

import UserService from '../../../services/UserService';

import getters from './cash-getters'
import mutations from './cash-mutations'

const state = {
  userData: {},
  allCashAccountsDefaultValues: [],
  selectedNairaCashAccount: {},
  selectedDollarCashAccount: {},
  nairaCashStatements: [],
  dollarCashStatements: [],
  nairaCashStatementSummary: {},
  dollarCashStatementSummary: {},
  nairaSearchStartDate: moment().format('YYYY-MM-01'),
  nairaSearchEndDate: moment().format('YYYY-MM-DD'),
  dollarSearchStartDate: moment().format('YYYY-MM-01'),
  dollarSearchEndDate: moment().format('YYYY-MM-DD'),
}


export default {
  state,
  getters,
  mutations
}
