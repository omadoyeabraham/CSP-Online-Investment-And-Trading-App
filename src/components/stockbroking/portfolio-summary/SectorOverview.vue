
<template>
      <!-- TABS -->
      <div class="container-fluid">
      <v-tabs
        dark
        v-model="selectedTab">

        <!-- Tabs bar -->
        <v-tabs-bar class="white mb20" >
          <v-tabs-item
            :key="tabs[0]"
            :href="'#' + tabs[0]"
            >
            <span class="font-size-14" style="color: #000000">{{tabs[0]}}</span>
          </v-tabs-item>
          <v-tabs-item
            :key="tabs[1]"
            :href="'#' + tabs[1]">
            <span class="font-size-14 red-text" style="color: #000000">{{tabs[1]}}</span>
          </v-tabs-item>
          <v-tabs-slider
            class="blue darken--2"
            style="height: 4px">
          </v-tabs-slider>
        </v-tabs-bar>

        <!-- Tabs content -->
        <v-tabs-content
          :id="tabs[0]"
          :key="tabs[0]">
  <v-card flat>
    <v-card-text>aaaaaaaaa</v-card-text>
  </v-card>
        </v-tabs-content>

        <v-tabs-content
          :id="tabs[1]"
          :key="tabs[1]">

  <v-card flat>
    <v-card-text>bbbbbb</v-card-text>
  </v-card>

        </v-tabs-content>

      </v-tabs>
      </div>
</template>


<script>
import SectorAllocationChart from './SectorAllocationChart'
import SectorPerformanceChart from './SectorPerformanceChart'
export default {
  props: [
    'sectorAllocationChartData',
    'sectorPerformanceChartData',
    'sectorData'
  ],
  components: {
    SectorAllocationChart,
    SectorPerformanceChart
  },
  data () {
    return {
      tabs: ['SUMMARY', 'DETAILS'],
      selectedTab: null
    }
  },
  methods: {
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    }
  }
}
</script>

<style scoped lang="sass">
  .card-header
    color: red
    background: yellow
</style>
