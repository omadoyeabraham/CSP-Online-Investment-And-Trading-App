<!--This component controls the market highlights box on the dashboard page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <!-- <v-layout>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <v-btn flat class="orange--text">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout> -->
  <div class="card w100p m5 elevation-1">
    <div class="card-block">
      <h4 class="card-title ml10">MARKET HIGHLIGHTS <span class="float-right mr10">30/08/2017</span></h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(item, index) in marketHighlights" :key="index">
          <div class="float-left">{{item.label}}</div>
          <div class="ml-auto">{{item.value}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // Service function used to obtain market highlight data
  import {getMarketHighlights} from '../../services/DashboardService';

  const marketHighlights = getMarketHighlights();

  export default
  {
    data () {
      return {
        marketHighlights: marketHighlights
      }
    }
  }
</script>

<style>

</style>
