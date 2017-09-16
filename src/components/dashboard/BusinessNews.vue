<!--
  Displays a business news feed curated from google news

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

    <v-card class="white lighten-2 card h-100" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">BUSINESS NEWS for 23-AUG-2017</div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">
        <li class="list-group-item" v-for="(newsItem, index) in newsFeed" :key="index">
          <a :href="newsItem.link" target="_blank">{{newsItem.title}}</a>
        </li>
      </ul>
    </div>

  </v-card>

</template>

<script>
  import {mapState} from 'vuex';

  export default
  {
    computed: mapState({
      'newsFeed': (store) => store.dashboard.newsFeed
    })
  }

</script>

<style>

</style>
