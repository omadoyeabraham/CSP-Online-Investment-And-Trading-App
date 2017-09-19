<!--This component controls the market highlights box on the dashboard page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-card class="white lighten-2 card h-100" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">Market Highlights for 23-AUG-2017</div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">
        <li class="list-group-item font-weight-bold" v-for="(item, index) in marketHighlights" :key="index">{{item.label}}
          <span class="ml-auto font-weight-normal">{{item.value}}</span>
        </li>
      </ul>
    </div>

  </v-card>

</template>

<script>
  export default
  {
    props: ['marketHighlights'],
    data () {
      return {

      }
    }
  }
</script>

<style>

</style>
