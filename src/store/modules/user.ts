/**
 * This store module defines the state,getters,mutations and actions for all things user related.
 * Th-s module handles:
 *  + Storing the authenticated user
 *  + Changing user details / profile
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
// import { authenticationService } from '../../services/AuthenticationService';

 // Initial store state
const state: object = {
  info: {},
  stockbroking: {},
  cashAccount: {},
  fixedIncome: {}
}

 // Getters
const getters = {
  info: (state) => state.info
}

export default {
  state,
  getters
}
