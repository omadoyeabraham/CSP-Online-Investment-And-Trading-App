<!--
  This component houses the graphs for sector allocation and performance
-->

<template>

  <v-card class="white lighten-2 card h-100" dark>

       <vue-tabs
        activeTabColor="#4c7396"
        activeTextColor="#FFFFFF"
        class="">

         <v-tab title="SECTOR ALLOCATION" class="">
           <sector-allocation-chart
            :sectorAllocationChartData="sectorAllocationChartData"
            :sectorData="sectorData">
           </sector-allocation-chart>
         </v-tab>

        <v-tab title="SECTOR PERFORMANCE" class="">
          <sector-performance-chart
             :sectorPerformanceChartData="sectorPerformanceChartData"
            :sectorData="sectorData">
          </sector-performance-chart>
        </v-tab>

        </vue-tabs>

  </v-card>

</template>

<script>
  import SectorAllocationChart from './SectorAllocationChart'
  import SectorPerformanceChart from './SectorPerformanceChart'
  export default
  {
    props: [
      'sectorAllocationChartData',
      'sectorPerformanceChartData',
      'sectorData'
    ],
    components: {
      SectorAllocationChart,
      SectorPerformanceChart
    }
  }
</script>

<style lang="sass">
  .title
    font-size: 11px !important
</style>
