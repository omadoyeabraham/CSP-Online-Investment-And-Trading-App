/**
 * The Stockbroking store module
 */


// All mutation types that can be carried out on the store state by the application
import * as mutationTypes from '../mutation-types.js';

// Initial Store State
const state = {
  marketHighlights: {},
  nseAsi: [],
  topGainers: [],
  topLosers: [],
  tradeOrders: {},
  marketData: {}
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
}

// Mutations to this module's store state
const mutations = {

  [mutationTypes.SAVE_DASHBOARD_DATA_TO_STORE](state, dashboardData) {
    state.marketHighlights = dashboardData.MARKETHIGHLIGHTS
    state.nseAsi = dashboardData.NSEASI
    state.topGainers = dashboardData.TOPGAINERS.item
    state.topLosers = dashboardData.TOPLOSERS.item
  },

  [mutationTypes.SAVE_TRADE_ORDERS_TO_STORE] (state, tradeOrders: Array<object>) {
    state.tradeOrders = tradeOrders
  },

  [mutationTypes.SAVE_MARKET_DATA_TO_STORE] (state, marketData: Array<object>) {
    state.marketData = marketData
  }

} // EOF mutations



export default {
  state,
  getters,
  mutations
}
