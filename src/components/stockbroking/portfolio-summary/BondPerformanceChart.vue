<template>
  <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div>BOND PERFORMANCE</div>
    </div>

    <!-- Card body -->
    <div class="card-block" id="chartContainer">
      <highcharts :options="bondPerformanceChartData" ref="highcharts" style="height: 230px;
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
  props: ['bondPerformanceChartData', 'bondData']
}
</script>

<style>

</style>
