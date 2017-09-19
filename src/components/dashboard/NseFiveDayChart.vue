<template>

    <v-card class="white lighten-2 card" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div>NSE ALL SHARE INDEX - 5 DAYS CHART</div>
    </div>

    <!-- Card body -->
    <div class="card-block" id="chartContainer">
      <highcharts :options="chartData" ref="highcharts" style="height: 230px; max-width: 100%"></highcharts>
    </div>

  </v-card>

</template>

<script>
  export default
  {
    props: ['chartData'],

    mounted: function () {
      window.addEventListener('resize', this.resizeChart)
    },

    beforeDestroy: function () {
      window.removeEventListener('resize', this.resizeChart)
    },

    data () {
      return {

      }
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
          const chartContainerWidth = document.querySelector('#chartContainer').offsetWidth

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
