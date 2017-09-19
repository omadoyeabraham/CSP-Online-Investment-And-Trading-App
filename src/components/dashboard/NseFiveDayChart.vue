<template>

    <v-card class="white lighten-2 card" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div>NSE ALL SHARE INDEX - 5 DAYS CHART</div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <highcharts :options="chartData" style="height: 230px; width: 100%"></highcharts>
    </div>

  </v-card>

</template>

<script>
  export default
  {
    props: ['chartData']
  }
</script>

<style>

</style>
