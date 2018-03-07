<template>

  <v-card class="white elevation-0 lighten-2 card h-100" dark>

    <!-- Heading -->
    <!-- <div class="w100p bg-csp-light-blue p10">
      <div>SECTOR ALLOCATION</div>
    </div> -->

    <!-- Card body -->
    <div class="card-block p0" id="sectorPerformanceChartContainer" v-if="sectorData">
      <highcharts :options="sectorAllocationChartData" ref="highcharts" style="height: 200px;
          max-width: 100%" >
      </highcharts>

    </div>


  <div v-if="!sectorData" class="d-flex mt50 ml-auto mr-auto elevation-0">
    <p class="font-size-15 black--text">No holdings in this portfolio</p>
  </div>


  </v-card>

</template>

<script>
  export default
  {

    created: function () {
      window.addEventListener('resize', this.resizeChart)
    },

    beforeDestroy: function () {
      window.removeEventListener('resize', this.resizeChart)
    },

    props: ['sectorData', 'sectorAllocationChartData'],

    methods: {

      // Resize the chart to fit into the container whenever the window resizes
      resizeChart: function () {
        // So we can access the correct this context in the setTimeout function
        let that = this

        // Used a setTimeout so that the resized width of the container is set before we query it for use.
        // 400 ms was the fastest time for which it worked
        setTimeout(function () {
          const chart = that.$refs.highcharts.chart
          const chartContainerWidth = document.querySelector('#sectorPerformanceChartContainer').offsetWidth

          chart.containerWidth = chartContainerWidth
          chart.chartWidth = chartContainerWidth
          console.log('called')
          chart.reflow()
        }, 400)
      }

    }
  }
</script>

<style>

</style>
