// Imports
import _ from 'lodash'
import moment from 'moment'
import {ChartService} from '../../../services/ChartsService'
import UtilityService from '../../../services/UtilityService'

const getters = {


  // Work on market highlights data to fit our dashboard UI specification
  marketHighlights: (state) => {
    let indexChange = parseFloat(state.marketHighlights.delta)

    const data = [
      { label: 'Index Change', value:indexChange, isIndexChange: true },
      { label: 'All share Index', value: state.marketHighlights.lastTradePrice },
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
        labels: {
          formatter: function () {
            return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
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
   * Calculate the total stockbroking value of the user's portfolio
   */
  getStbTotalValue: (state) => {
    const portfolios = state.portfolios
    let stbTotalValue = 0

    portfolios.forEach((portfolio) => {
      // DO not sum up non-exchange or SMA portfolios
      if (portfolio.portfolioClass != "EXCHANGE" || portfolio.label.indexOf('(SMA)') != -1){
        return
      } else {
        stbTotalValue += parseFloat(portfolio.currentValuation.amount)
      }
    })

    return stbTotalValue
  },


  /**
   * Validate that a portfolio is not currently set
   *
   * @return boolean
   */
  currentPortfolioIsNotSet: (state) => {
    let keys = Object.keys(state.currentPortfolio)
    return (keys.length == 0)
  },

  /**
   * Get the acquisition cost for the currently selected portfolio
   *
   */
  currentPortfolioAcquisitionCost: (state, getters) => {
    if (getters.currentPortfolioIsNotSet) {
      return 0
    }

    return state.currentPortfolio.costBasis.amount
  },

  /**
   * Get the available cash for the currently selected portfolio
   *
   */
  currentPortfolioAvailableCash: (state, getters) => {
    if (getters.currentPortfolioIsNotSet) {
      return 0
    }

    return state.currentPortfolio.availableCash.amount
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
  currentPortfolioGainOrLoss: (state, getters) => {
    // Return 0 if the current portfolio is empty
    if (getters.currentPortfolioIsNotSet) {
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

    const gainOrLossPercentage = ((getters.currentPortfolioGainOrLoss) / (parseFloat(state.currentPortfolio.costBasis.amount))) * 100

    return gainOrLossPercentage
  },

  /**
   * Get the portfolio holdings of the currentl selected portfolio
   *
   */
  getCurrentPortfolioHoldings: (state, getters) => {
    // Ensure that a current portfolio is set
    if (getters.currentPortfolioIsNotSet) {
      return []
    }

    // Check because some portfolios don't have the portfolio holdings index set on the portfolio object
    let portfolioHoldings = state.currentPortfolio.portfolioHoldings ? state.currentPortfolio.portfolioHoldings : [];

    return portfolioHoldings
  },

  /**
   * Get the sector allocation and performancefor the currently selected portfolio
   *
   * @return Array<object>
   */
  getPortfolioHoldingsSectorData: (state, getters) => {
    // Ensure that a current portfolio is set
    if (getters.currentPortfolioIsNotSet) {
      return null
    }

    let portfolioHoldings = getters.getCurrentPortfolioHoldings

    if (portfolioHoldings.length === 0) {
      return null
    }

    // Get all sectors in the current portfolio
    let sectors = portfolioHoldings.map((holding) => {
      return holding.securitySector
    })
    // Ensure that the sectors are unique
    sectors = _.uniq(sectors).sort()

    let sectorData = []

    // Loop through all unique sectors and get the sector value, and performance
    sectors.forEach((sector) => {
      let sectorValue = 0
      let sectorPerformance = 0
      let totalPortfolioValue = 0

      // Loop through holdings and increase the unique sectors value, if a user has a stock in that sector
      portfolioHoldings.forEach((portfolioHolding) => {
        totalPortfolioValue += parseFloat(portfolioHolding.valuation)

        if (portfolioHolding.securitySector == sector) {
          sectorValue += parseFloat(portfolioHolding.valuation)
          sectorPerformance += parseFloat(portfolioHolding.percentGain)

        }
      })

      let percentageOfPortfolio = ((sectorValue / totalPortfolioValue) * 100).toFixed(2)
      let totalPercentageGain = sectorPerformance.toFixed(2)
      // Because highcharts requires this structure to draw pie charts
      sectorData.push({
        name: sector,
        y: sectorValue,
        percentageOfPortfolio: percentageOfPortfolio,
        percentageGain: totalPercentageGain
      })


    })

    let others = {
      name: 'others',
      y: 0,
      percentageOfPortfolio: 0,
      percentageGain: 0
    }

     // Add all sectors that make up less than 5% of the to an 'others' sector instead
    sectorData = sectorData.filter((sectorAllocation, index) => {
      if (sectorAllocation.percentageOfPortfolio < 5.00) {
        others.y += sectorAllocation.y
        others.percentageOfPortfolio += parseFloat(sectorAllocation.percentageOfPortfolio)
        others.percentageGain += parseFloat(sectorAllocation.percentageGain)
        return false

      }else {
        return true
      }
    })

    // Only add others if there are actually others to add
    if (others.y !== 0) {
      sectorData.push(others)
    }

    return sectorData

  },

/**
 * Get the stock allocation and performance for the currently selected portfolio
 *
 * @return Array<object>
 */
  getPortfolioHoldingsStockData: (state, getters) => {
    // Ensure that a current portfolio is set
    if (getters.currentPortfolioIsNotSet) {
      return null
    }

    let portfolioHoldings = getters.getStockPortfolioHoldings

    if (portfolioHoldings.length === 0) {
      return null
    }

    let stockData = []
    let stockValue = 0
    let stockPerformance = 0
    let totalPortfolioValue = 0

    // Obtain the total value of the portfolio
    portfolioHoldings.forEach((portfolioHolding) => {
      totalPortfolioValue += parseFloat(portfolioHolding.valuation)
    })

    portfolioHoldings.forEach((portfolioHolding) => {

      // get the stock's performance, value, and % of the portfolio
      stockValue = parseFloat(portfolioHolding.valuation)
      stockPerformance = parseFloat(portfolioHolding.percentGain)

      let percentageOfPortfolio = ((stockValue / totalPortfolioValue) * 100).toFixed(2)
      // Because highcharts requires this structure to draw pie charts
      stockData.push({
        name: portfolioHolding.securityName,
        y: stockValue,
        percentageOfPortfolio: percentageOfPortfolio,
        percentageGain: stockPerformance
      })

    })

    let others = {
      name: 'others',
      y: 0,
      percentageOfPortfolio: 0,
      percentageGain: 0
    }

    // Add all stocks that make up less than 5% of the to an 'others' section instead
    stockData = stockData.filter((stock, index) => {
      if (stock.percentageOfPortfolio < 5.00) {
        others.y += stock.y
        others.percentageOfPortfolio += parseFloat(stock.percentageOfPortfolio)
        others.percentageGain += parseFloat(stock.percentageGain)
        return false

      } else {
        return true
      }
    })

    // Only add others if there are actually others to add
    if (others.y !== 0) {
      stockData.push(others)
    }

    return stockData

  },

  /**
 * Get the bond allocation and performance for the currently selected portfolio
 *
 * @return Array<object>
 */
  getPortfolioHoldingsBondData: (state, getters) => {
    // Ensure that a current portfolio is set
    if (getters.currentPortfolioIsNotSet) {
      return null
    }

    let portfolioHoldings = getters.getBondPortfolioHoldings

    if (portfolioHoldings.length === 0) {
      return null
    }

    let bondData = []
    let bondValue = 0
    let bondPerformance = 0
    let totalPortfolioValue = 0

    // Obtain the total value of the portfolio
    portfolioHoldings.forEach((portfolioHolding) => {
      totalPortfolioValue += parseFloat(portfolioHolding.valuation)
    })

    portfolioHoldings.forEach((portfolioHolding) => {

      // get the stock's performance, value, and % of the portfolio
      bondValue = parseFloat(portfolioHolding.valuation)
      bondPerformance = parseFloat(portfolioHolding.percentGain)

      let percentageOfPortfolio = ((bondValue / totalPortfolioValue) * 100).toFixed(2)
      // Because highcharts requires this structure to draw pie charts
      bondData.push({
        name: portfolioHolding.securityName,
        y: bondValue,
        percentageOfPortfolio: percentageOfPortfolio,
        percentageGain: bondPerformance
      })

    })

    return bondData

  },

  /**
   * Get the highcharts object used to plot the sector allocation chart on the STB- portfolio summary
   *
   * @return Object
   */
  sectorAllocationChartData: (state, getters) => {

    const chartData = ChartService.getCspPieChart(getters.getPortfolioHoldingsSectorData)

    return chartData
  },

  /**
   * Get the highcharts object used to plot the sector performance chart on the STB- portfolio summary
   *
   * @return Object
   */
  sectorPerformanceChartData: (state, getters) => {
    const chartData = ChartService.getCspBarChart(getters.getPortfolioHoldingsSectorData)
    return chartData
  },

  /**
 * Get the highcharts object used to plot the stock allocation chart on the STB- portfolio summary
 *
 * @return Object
 */
  stockAllocationChartData: (state, getters) => {

    const chartData = ChartService.getCspPieChart(getters.getPortfolioHoldingsStockData)

    return chartData
  },

  /**
 * Get the highcharts object used to plot the stock performance chart on the STB- portfolio summary
 *
 * @return Object
 */
  stockPerformanceChartData: (state, getters) => {
    const chartData = ChartService.getCspBarChart(getters.getPortfolioHoldingsStockData)
    return chartData
  },

/**
* Get the highcharts object used to plot the bond allocation chart on the STB- portfolio summary
*
* @return Object
*/
  bondAllocationChartData: (state, getters) => {

    const chartData = ChartService.getCspPieChart(getters.getPortfolioHoldingsBondData)

    return chartData
  },

  /**
  * Get the highcharts object used to plot the bond performance chart on the STB- portfolio summary
  *
  * @return Object
  */
  bondPerformanceChartData: (state, getters) => {
    const chartData = ChartService.getCspBarChart(getters.getPortfolioHoldingsBondData)
    return chartData
  },


  /**
   * Get all stock portfolio holdings for the user
   */
  getStockPortfolioHoldings: (state, getters) => {
    let currentPortfolioHoldings = getters.getCurrentPortfolioHoldings

    if (currentPortfolioHoldings.length === 0) {
      return []
    }

    // Filter to pick only equity stock
    let stockPortfolioHoldings = currentPortfolioHoldings.filter((portfolioHolding) => {
      return (portfolioHolding.securityType === 'EQUITY')
    })

    let percentageOfPortfolio = 0
    let gainOrLoss = 0
    let percentageGainOrLoss = 0
    let totalCost = 0
    let currentStockValue = 0
    let totalPortfolioValue = getters.currentPortfolioTotalValue
    let currentPortfolioStockHoldings = []

    stockPortfolioHoldings.forEach((stockPortfolioHolding) => {
        percentageOfPortfolio = ((parseFloat(stockPortfolioHolding.valuation)) / totalPortfolioValue) * 100
        totalCost = parseFloat(stockPortfolioHolding.costBasis) * parseFloat(stockPortfolioHolding.quantityHeld)
        gainOrLoss = parseFloat(stockPortfolioHolding.valuation) - totalCost
        percentageGainOrLoss = (gainOrLoss / totalCost) * 100

        stockPortfolioHolding.percentageOfPortfolio = percentageOfPortfolio
        stockPortfolioHolding.gainOrLoss = gainOrLoss
        stockPortfolioHolding.percentageGainOrLoss  = percentageGainOrLoss
        stockPortfolioHolding.totalCost = totalCost

        if (gainOrLoss < 0) {
          stockPortfolioHolding.lost = true
        }else if(gainOrLoss > 0) {
          stockPortfolioHolding.gained = true
        }

        currentPortfolioStockHoldings.push(stockPortfolioHolding)
    })

    return currentPortfolioStockHoldings
  },

   /**
   * Get all bond portfolio holdings for the user
   */
  getBondPortfolioHoldings: (state, getters) => {
    const currentPortfolioHoldings = getters.getCurrentPortfolioHoldings

    if (currentPortfolioHoldings.length === 0) {
      return []
    }
    const bondPortfolioHoldings = currentPortfolioHoldings.filter((portfolioHolding) => {
      return (portfolioHolding.securityType === 'BOND')
    })

    // Data initialization
    let faceValue = 0
    let accruedCoupon = 0
    let currentPortfolioBondHoldings = []
    let bond = {}

    // Loop through the bond holding, and perform the necessary calculations
    bondPortfolioHoldings.forEach((bondHolding, index) => {
      faceValue = parseFloat(bondHolding.quantityHeld) * parseFloat(bondHolding.parValue)
      accruedCoupon = (parseFloat(bondHolding.dirtyPrice) - parseFloat(bondHolding.marketPrice)) * parseFloat(bondHolding.quantityHeld)

      bondHolding.id = index
      bondHolding.faceValue = faceValue
      bondHolding.accruedCoupon = accruedCoupon
      let nextCouponDate = moment(bondHolding.lastCouponDate).add(90, 'days')
      bondHolding.nextCouponDate = nextCouponDate

      currentPortfolioBondHoldings.push(bondHolding)

    })

    return currentPortfolioBondHoldings
  },

  /**
   * Return the trade orders that belong to the selected portfolio
   *
   */
  getCurrentPortfolioTradeOrders: (state, getters) => {

    let selectedPortfolioName = state.currentPortfolio.name
    let tradeOrders = state.tradeOrders

    if(UtilityService.objectHasNodata(tradeOrders)) {
      return []
    }

    let currentPortfolioTradeOrders = tradeOrders.filter((tradeOrder) => {
      return (tradeOrder.portfolioName === selectedPortfolioName)
    })

    return currentPortfolioTradeOrders
  },

  /**
   * Return the 5 most recent trades by the user
   *
   */
  getRecentTradeOrders: (state, getters) => {

    let tradeOrders = state.tradeOrders

    if (UtilityService.objectHasNodata(tradeOrders)) {
      return []
    }

    return tradeOrders.slice(0, 4)
  },

  /**
   * Return completed trades for the selected portfolio
   *
   */
  getCompletedTradeOrders: (state, getters) => {

    let tradeOrders = getters.getCurrentPortfolioTradeOrders

    let completedTradeOrders = tradeOrders.filter((tradeOrder) => {
      return tradeOrder.fixOrderStatus === 'FILLED'
    })

    // completedTradeOrders.reverse()

    return completedTradeOrders
  },

  /**
   * Return completed trades for the selected portfolio
   *
   */
  getOutstandingTradeOrders: (state, getters) => {

    let tradeOrders = getters.getCurrentPortfolioTradeOrders

    let outstandingTradeOrders = tradeOrders.filter((tradeOrder) => {

      return tradeOrder.fixOrderStatus !== 'FILLED'
    })

    return outstandingTradeOrders
  },

  /**
   * Get the trade order terms
   *
   */
  getTradeOrderTerms: (state, getters) => {

    let orderTerms = []

    state.tradeOrderTerms.forEach((orderTerm) => {
      orderTerms.push({
        text: orderTerm.label,
        value: orderTerm.name
      })
    })

    return orderTerms

  },

  /**
   * Returns all securities trading on the NSE floor
   *
   */
  getSecurityNames: (state, getters) => {

    let securityNames = []

    state.securityNames.forEach((securityName) => {
      securityNames.push({
        text: securityName.name,
        value: securityName.name,
        id: securityName.id
      })
    })

    return securityNames

  },

  /**
   * Return the names of all securities in the current portfolio
   */
  getAllSecuritiesInCurrentPortfolio: (state, getters) => {

    // Ensure that a current portfolio is set
    if (getters.currentPortfolioIsNotSet) {
      return []
    }

    let portfolioHoldings = getters.getStockPortfolioHoldings

    if (portfolioHoldings.length === 0) {
      return []
    }

    let stockNames = []

    portfolioHoldings.forEach((portfolioHolding) => {
      stockNames.push(portfolioHolding.securityName)
    })

    return stockNames
  },

}


export default getters
