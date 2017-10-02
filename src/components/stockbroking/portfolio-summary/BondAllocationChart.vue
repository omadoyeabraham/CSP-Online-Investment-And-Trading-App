<template>
  <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div>BOND ALLOCATION</div>
    </div>

    <!-- Card body -->
    <div class="card-block" id="bondAllocationChartContainer">
      <highcharts :options="bondAllocationChartData" ref="highcharts" style="height: 230px;
              max-width: 100%" v-if="bondData">
      </highcharts>
      <div v-if="!bondData" class="d-flex">
        <p class="font-size-20 blue--text text--darken-4">No holdings in this portfolio</p>
      </div>
    </div>

  </v-card>
</template>

<script>
export default
{
  props: ['bondData', 'bondAllocationChartData'],

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
        const chartContainerWidth = document.querySelector('#bondAllocationChartContainer').offsetWidth

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
