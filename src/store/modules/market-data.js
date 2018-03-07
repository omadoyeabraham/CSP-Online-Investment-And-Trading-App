/**
 * This store module defines the state,getters,mutations and actions for all things market data related.
 * The market data includes top gainers & losers, nse 5 days data, full market data (for the market data page) e.t.c
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
import { treasuryBills, bonds } from '../../services/MarketDataService';

 // Initial store state
const state = {
  treasuryBills: treasuryBills,
  bonds: bonds
}

 // Getters
const getters = {
}

export default {
  state,
  getters
}
