/**
 * The Stockbroking store module
 */


// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

import UserService from '../../services/UserService';

// Initial Store State
const state = {
  marketHighlights: {},
  nseAsi: [],
  topGainers: [],
  topLosers: [],
  tradeOrders: {},
  marketData: {},
  portfolios: [],
  currentPortfolio: {},
  totalValue: 0
}

const getters = {
  // Work on market highlights data to fit our dashboard UI specification
  marketHighlights: (state) => {
    const data = [
      { label: 'All share Index', value: state.marketHighlights.lastTradePrice },
      { label: 'Index Change', value: state.marketHighlights.delta },
      { label: 'Market Cap', value: state.marketHighlights.refPriceDttm },
      { label: 'Vol. Traded', value: state.marketHighlights.volumeTraded },
      { label: 'Value Traded', value: state.marketHighlights.valueTraded },
      { label: 'Number of Deals', value: state.marketHighlights.numberOfDeals }
    ]
    return data;
  },

  // Return the data used to plot the 5 day ASI chart
  chartData: (state) => {
    const dates = [];
    const values = [];

    // Loop through state data and properly format the dates and values
    state.nseAsi.forEach((dayData) => {
      // Remove the timestamp from the date returned
      const date = dayData.createdDttm.split(' ')[0]

      dates.push(date)
      values.push(parseFloat(dayData.closingPrice))
    });

    // Reverse the order because the data is returned in descending order of date
    dates.reverse()
    values.reverse()

    // Calculate the data point interval on the Y axis
    const maximumValue = Math.max(...values)
    const minimumValue = Math.min(...values)
    /**
     * Divide by 500 = (5*100) because we want (5+1) data points
     *                 /100 & *100 so we round up to the nearest 100 using Math.ceil
     */
    const yAxisInterval = Math.ceil((maximumValue - minimumValue) / 500) * 100

    const chartData = {
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: ''
        },
        min: minimumValue,
        max: maximumValue,
        tickInterval: yAxisInterval
      },
      series: [{
        name: ' ',
        data: values,
        showInLegend: false
      }],
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillOpacity: 0.6
        }
      }
    }

    return chartData;
  },

  // Return the daily top gainers
  topGainers: (state) => {
    const data = []

    // Only pick required data
    state.topGainers.forEach((gainer) => {
      data.push({
        symbol: gainer.symbol,
        change: gainer.percentPriceChange.toFixed(2)
      })
    })

    return data
  },

  // Return the daily top losers
  topLosers: (state) => {
    const data = []

    // Only pick required data
    state.topLosers.forEach((loser) => {
      data.push({
        symbol: loser.symbol,
        change: (Math.abs(loser.percentPriceChange)).toFixed(2)
      })
    })

    return data
  },

  /**
   * Return the number of accounts in a user's STB portfolio
   *
   * @return int
   */
  numberOfAccountsInPortfolio: (state) => {
    return state.portfolios.length
  },

  /**
   * Get the total value of the currently selected portfolio
   *
   * @return float
   */
  currentPortfolioTotalValue: (state) => {
    // Return 0 if the current portfolio is empty
    if (state.currentPortfolio === {}) {
      return 0
    }

    if ((state.currentPortfolio.availableCash === undefined) || (state.currentPortfolio.currentValuation === undefined)) {
      return 0
    }

    const totalValue = parseFloat(state.currentPortfolio.availableCash.amount) + parseFloat(state.currentPortfolio.currentValuation.amount)

    return totalValue
  },

  /**
   * Get the gain/loss on the currently selected STB portfolio
   *
   * @return float
   */
  currentPortfolioGainOrLoss: (state) => {
    // Return 0 if the current portfolio is empty
    if (state.currentPortfolio === {}) {
      return 0
    }

    if ((state.currentPortfolio.availableCash === undefined) || (state.currentPortfolio.currentValuation === undefined)) {
      return 0
    }

    const gainOrLoss = parseFloat(state.currentPortfolio.currentValuation.amount) - parseFloat(state.currentPortfolio.costBasis.amount)

    return gainOrLoss
  },

  /**
   * Get the % gain or loss on the currently selected stb portfolio
   *
   * @return float
   */
  currentPortfolioGainOrLossPercentage: (state, getters) => {
    // Check if the current portfolio has a value for gain/loss
    if (getters.currentPortfolioGainOrLoss === 0) {
      return 0
    }

    const gainOrLossPercentage = ( (getters.currentPortfolioGainOrLoss) / (parseFloat(state.currentPortfolio.costBasis.amount)) ) * 100

    return gainOrLossPercentage
  }
}

// Mutations to this module's store state
const mutations = {

  [mutationTypes.SAVE_DASHBOARD_DATA_TO_STORE](state, dashboardData) {
    state.marketHighlights = dashboardData.MARKETHIGHLIGHTS
    state.nseAsi = dashboardData.NSEASI
    state.topGainers = dashboardData.TOPGAINERS.item
    state.topLosers = dashboardData.TOPLOSERS.item
  },

  [mutationTypes.SAVE_USER_STOCKBROKING_DATA_TO_STORE] (state, userData) {
    state.userData = userData.STB;

    // If the user has at least 1 STB portfolio
    if (userData.STB.hasOwnProperty('EXCHANGE')) {
      state.portfolios = userData.STB.EXCHANGE

      // Default the current portfolio to the first portfolio returned
      state.currentPortfolio = state.portfolios[0]

    }

    state.totalValue = UserService.getStbTotalValue(state.userData)
  },

  [mutationTypes.SAVE_TRADE_ORDERS_TO_STORE] (state, tradeOrders: Array<object>) {
    state.tradeOrders = tradeOrders
  },

  [mutationTypes.SAVE_MARKET_DATA_TO_STORE] (state, marketData: Array<object>) {
    state.marketData = marketData
  },

  [mutationTypes.CHANGE_CURRENT_PORTFOLIO] (state, accountNo) {
    let selectedPortfolio = []

    state.portfolios.forEach((portfolio) => {
      if (portfolio.accountNo == accountNo) {
        selectedPortfolio = portfolio
      }
    })

    state.currentPortfolio = selectedPortfolio
  }

} // EOF mutations



export default {
  state,
  getters,
  mutations
}
