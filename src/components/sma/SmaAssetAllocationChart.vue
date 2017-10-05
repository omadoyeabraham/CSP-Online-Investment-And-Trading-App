<template>


  <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div>ASSET ALLOCATION</div>
    </div>

    <!-- Card body -->
    <div class="card-block p0" id="bondAllocationChartContainer">
      <highcharts :options="chartData" ref="highcharts" style="height: 200px;
                max-width: 100%" v-if="chartData">
      </highcharts>
      <div v-if="!chartData" class="d-flex mt15 justify-center">
        <p class="font-size-15 black--text">No holdings in this portfolio</p>
      </div>
    </div>

  </v-card>


</template>

<script>
export default
{
  props: [
    'chartData',
    'assetAllocationChartData'
  ]
}
</script>

<style>

</style>
