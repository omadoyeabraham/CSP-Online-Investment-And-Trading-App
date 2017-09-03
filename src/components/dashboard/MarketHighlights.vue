<!--This component controls the market highlights box on the dashboard page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <!-- <v-container fluid class="card-header blue darken-3">
      <v-layout row >
        <v-flex class="mr-auto" xs7>
          Market Hightlights
        </v-flex>
        <v-flex class="text-right" xs5>
          30-AUG-2017
        </v-flex>
      </v-layout>
    </v-container> -->
    <div class="w100p blue darken-3 p10">
      <div class="text-uppercase">Market Highlights for 23-AUG-2017</div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">
        <li class="list-group-item" v-for="(item, index) in marketHighlights" :key="index">{{item.label}}
          <span class="ml-auto">{{item.value}}</span>
        </li>
      </ul>
    </div>

  </v-card>

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
