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

 // The dashboard store module
 import DashboardDataStore from './modules/dashboard';

 // The user store module
 import UserDataStore from './modules/user.ts';

 // The stockbroking store module
 import StockbrokingStore from './modules/stockbroking.ts'

 /**
  * VuexPersistence object used to persist data in localstorage until the user signs out
  */
 const vuexLocalStorage = new VuexPersistence({
   storage: window.sessionStorage
 })

 /**
  * Vuex store which stores and manages application wide data that should be
  * accessible to all components.
  */
 export default new Vuex.Store({
   modules: {
     dashboard: DashboardDataStore,
     marketData: MarketDataStore,
     user: UserDataStore,
     stockbroking: StockbrokingStore
   },
   plugins: [vuexLocalStorage.plugin]
 });
