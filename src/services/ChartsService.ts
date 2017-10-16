/**
 * Provides the configuartion for the charts used by the portal
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */



 /**
  * Get the highcharts configuration for a pie chart
  *
  * @param data  Array   The data to be plotted
  */
 let getCspPieChart = (dataToBePlotted) => {

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
       pointFormat: '<b>{point.percentage:.1f}%</b>'
     },
     plotOptions: {
       pie: {
         size: '100%',
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
           enabled: false,
           formatter: function () {
             return Math.round(this.percentage * 100) / 100 + ' %';
           },
           distance: -40,
           rotation: 10
         },
         showInLegend: true
       }
     },
     series: [{
       name: 'SECTOR PERFORMANCE',
       colorByPoint: true,
       data: dataToBePlotted

     }]
   }

   return chartData
 }

 /**
  * Get the highcharts configuration for a pie chart
  *
  * @param dataToBePlotted
  */
  let getCspBarChart = (dataToBePlotted) => {

    // Get the sector data for the portofolio and initialize variables
    let dataSet = dataToBePlotted
    let graphData = [{
      data: []
    }]
    let categories = []
    let performanceColor = ''

    /**
     * Because we return when detecting portfolios with any holding data at all
     */
    if (dataSet === null) {
      dataSet = []
    }

    dataSet.forEach((data) => {

      // Red for losses and green for gains
      performanceColor = (data.percentageGain < 0) ? '#FF0000' : '#00FF00'

      // Format the data properly for display using highcharts column chart
      graphData[0].data.push({
        y: parseFloat(data.percentageGain),
        color: performanceColor
      })

      categories.push(data.name)

    })

    const chartData = {
      chart: {
        type: 'column',
        verticalAlign: 'middle',
        height: 190
      },
      title: {
        text: ''
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
        '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      xAxis: {
        categories: categories,
      },
      legend: {
        enabled: false,
        align: 'left',
      },
      yAxis: {
        title: {
          text: '( % )'
        }
      },
      credits: {
        enabled: false
      },
      series: graphData
    }

    return chartData
  }

  // Return the data used to plot the 5 day ASI chart
  let getCspAreaChart = (data) => {
    const dates = [];
    const values = [];

    // Loop through state data and properly format the dates and values
   data.forEach((dayData) => {
      // Remove the timestamp from the date returned
      // const date = dayData.createdDttm.split(' ')[0]

      dates.push(dayData.date)
      values.push(parseFloat(dayData.price))
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
      lineWidth: 1,
      title: {
        text: ''
      },
      xAxis: {
        categories: dates,
        labels: {
          enabled: false
        }
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
        // min: minimumValue,
        // max: maximumValue,
        // tickInterval: yAxisInterval
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
          // fillOpacity: 0.1,
          // fillColor: '#4c7396'
        },
        series: {

        }
      }
    }

    return chartData;
  }


 export const ChartService = {
   getCspPieChart: getCspPieChart,
   getCspBarChart: getCspBarChart,
   getCspAreaChart: getCspAreaChart
 }
