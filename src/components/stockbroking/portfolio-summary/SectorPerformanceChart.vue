<template>

  <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div>SECTOR PERFORMANCE</div>
    </div>

    <!-- Card body -->
    <div class="card-block" id="chartContainer">
      <highcharts
        :options="sectorPerformanceChartData"
        ref="highcharts" style="height: 230px;
        max-width: 100%"
        v-if="sectorAllocation">
      </highcharts>
      <div v-if="!sectorAllocation" class="d-flex">
         <p  class="font-size-20 blue--text text--darken-4">No holdings in this portfolio</p>
      </div>
    </div>

  </v-card>

</template>

<script>
  export default
  {
    props: ['sectorPerformanceChartData', 'sectorAllocation']
  }
</script>

<style>

</style>
