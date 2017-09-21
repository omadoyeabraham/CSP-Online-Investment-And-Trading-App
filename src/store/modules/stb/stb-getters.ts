// Imports
import _ from 'lodash'

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
      console.log('here')
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

  getCurrentPortfolioHoldings: (state, getters) => {
    // Ensure that a current portfolio is set
    if (getters.currentPortfolioIsNotSet) {
      return []
    }


    let portfolioHoldings = state.currentPortfolio.portfolioHoldings;
    return portfolioHoldings
  },

  /**
   * Get the sector allocation for the currently selected portfolio
   *
   * @return Array<object>
   */
  getSectorAllocation: (state, getters) => {
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

    let sectorAllocations = []

    // Loop through all unique sectors
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

      // Because requires this structure to draw pie charts
      sectorAllocations.push({
        name: sector,
        y: sectorValue,
        percentageOfPortfolio: percentageOfPortfolio,
        percentageGain: sectorPerformance
      })

    })

    let others = {
      name: 'others',
      y: 0,
      percentageOfPortfolio: 0
    }

     // Add all sectors that make up less than 5% of the to an 'others' sector instead
    let sectorData = sectorAllocations.filter((sectorAllocation, index) => {
      if (sectorAllocation.percentageOfPortfolio < 5.00) {
        others.y += sectorAllocation.y
        others.percentageOfPortfolio += parseFloat(sectorAllocation.percentageOfPortfolio)
        return false
        // sectorAllocations.splice(index, 1)
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
   * Get the highcharts object used to plot the sector performance chart on the STB- portfolio summary
   *
   * @return Object
   */
  sectorPerformanceChartData: (state, getters) => {
    const chartData = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            formatter: function () {
              return Math.round(this.percentage * 100) / 100 + ' %';
            },
            distance: -30
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        // data: [
        //   {
        //     name: 'Explorer',
        //     y: 56.33
        //   },
        //   {
        //     name: 'Chrome',
        //     y: 24.03,
        //     selected: true
        //   },
        //   {
        //     name: 'Firefox',
        //     y: 10.38
        //   },
        //   {
        //     name: 'Safari',
        //     y: 4.77,
        //     dataLabels: {
        //       enabled: false
        //     }
        //   }
        // ]
        data: getters.getSectorAllocation

      }]
    }

    return chartData
  }
}


export default getters
