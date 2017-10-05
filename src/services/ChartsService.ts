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


 export const ChartService = {
   getCspPieChart: getCspPieChart,
   getCspBarChart: getCspBarChart
 }
