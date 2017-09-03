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

 // The marketdata store module
 import MarketDataStore from './modules/market-data.js';

 // The dashboard store module
 import DashboardDataStore from './modules/dashboard.js';

 // const debug = process.env.NODE_ENV !== 'production'

 /**
  * Vuex store which stores and manages application wide data that should be
  * accessible to all components.
  */
 export default new Vuex.Store({
   modules: {
     dashboard: DashboardDataStore,
     marketData: MarketDataStore
   }
 });
