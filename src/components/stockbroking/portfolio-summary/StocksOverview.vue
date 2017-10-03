<!--
  This component houses the graphs for stock allocation and performance
-->

<template>

  <v-card class="white lighten-2 card h-100" dark>

       <vue-tabs
        activeTabColor="#4c7396"
        activeTextColor="#FFFFFF"
        class="">

         <v-tab title="STOCK ALLOCATION" class="">
           <stock-allocation-chart
            :stockAllocationChartData="stockAllocationChartData"
            :stockData="stockData">
           </stock-allocation-chart>
         </v-tab>

        <v-tab title="STOCK PERFORMANCE" class="">
          <stock-performance-chart
             :stockPerformanceChartData="stockPerformanceChartData"
            :stockData="stockData">
          </stock-performance-chart>
        </v-tab>

        </vue-tabs>

  </v-card>

</template>

<script>
  import StockAllocationChart from './StockAllocationChart'
  import StockPerformanceChart from './StockPerformanceChart'
  export default
  {
    props: [
      'stockAllocationChartData',
      'stockPerformanceChartData',
      'stockData',
      'sectorData'
    ],
    components: {
      StockAllocationChart,
      StockPerformanceChart
    }
  }
</script>

<style lang="sass">
  .title
    font-size: 11px !important
</style>
