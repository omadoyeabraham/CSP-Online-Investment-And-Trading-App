<template>
  <v-card class="white elevation-0 lighten-2 card h-100" dark>

    <!-- Heading -->
    <!-- <div class="w100p bg-csp-light-blue p10">
      <div>STOCK PERFORMANCE</div>
    </div> -->

    <!-- Card body -->
    <div class="card-block p0" id="stockPerformanceChartContainer">
      <highcharts :options="stockPerformanceChartData" ref="highcharts" style="height: 150px;
          max-width: 100%" v-if="stockData">
      </highcharts>

    </div>


  <div v-if="!stockData" class="d-flex mt50 ml-auto mr-auto">
    <p class="font-size-15 black--text">No holdings in this portfolio</p>
  </div>




  </v-card>
</template>

<script>
export default
{
  props: ['stockPerformanceChartData', 'stockData'],

  created: function () {
    window.addEventListener('resize', this.resizeChart)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.resizeChart)
  },

  methods: {

    // Resize the chart to fit into the container whenever the window resizes
    resizeChart: function () {
      // So we can access the correct this context in the setTimeout function
      let that = this

      // Used a setTimeout so that the resized width of the container is set before we query it for use.
      // 400 ms was the fastest time for which it worked
      setTimeout(function () {
        const chart = that.$refs.highcharts.chart
        const chartContainerWidth = document.querySelector('#stockPerformanceChartContainer').offsetWidth

        chart.containerWidth = chartContainerWidth
        chart.chartWidth = chartContainerWidth
        chart.reflow()
      }, 400)
    }

  }
}
</script>

<style>

</style>
