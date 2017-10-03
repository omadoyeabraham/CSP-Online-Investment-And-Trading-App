/**
 * Bootstraps the application store, which is created by Vuex and implements a
 * flux like pattern for state management.
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

 import Vue from 'vue'

 // Vuex used for state management
 import Vuex from 'vuex'

 // Expose vuex to our vue instance
 Vue.use(Vuex)

 // Plugin used in persisting vuex data to localStorage
 import VuexPersistence from 'vuex-persist'

 // The marketdata store module
 import MarketDataStore from './modules/market-data';

 // The generalData store module
 import GeneralDataStore from './modules/general-data';

 // The user store module
 import UserDataStore from './modules/user.ts';

 // The stockbroking store module
 import StockbrokingStore from './modules/stb/stockbroking.ts'

 // The fixed income store module
 import FixedIncomeStore from './modules/fixed-income.ts'

 // The cash store module
 import CashStore from './modules/cash/cash.ts'

 // The error Module
 import ErrorStore from './modules/errors.ts'

 /**
  * VuexPersistence object used to persist data in sessionstorage until the user signs out
  */
 const vuexSessionStorage = new VuexPersistence({
   storage: window.sessionStorage
 })

 /**
  * Vuex store which stores and manages application wide data that should be
  * accessible to all components.
  */
 export default new Vuex.Store({
   modules: {
     generalData: GeneralDataStore,
     marketData: MarketDataStore,
     user: UserDataStore,
     stockbroking: StockbrokingStore,
     fixedIncome: FixedIncomeStore,
     cash: CashStore,
     errors: ErrorStore
   },
   plugins: [vuexSessionStorage.plugin]
 });
