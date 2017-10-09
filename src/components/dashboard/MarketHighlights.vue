<!--This component controls the market highlights box on the dashboard page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-card class="white lighten-2 card height-250px" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">Market Highlights </div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">
        <li class="list-group-item font-weight-bold pt5 pb5" v-for="(item, index) in marketHighlights" :key="index">{{item.label}}

          <!-- Index Change -->
          <span class="ml-auto font-weight-normal red--text" v-if="item.isIndexChange">
            <span v-if="item.value < 0" class="red--text">({{Math.abs(item.value) | currency('', 2)}})</span>
            <span v-else-if="item.value > 0" class="green--text text--lighthen-4">{{item.value | currency('', 2)}}</span>
            <span v-else class="">{{item.value | currency('', 2)}}</span>
          </span>

          <!-- Other Items -->
          <span class="ml-auto font-weight-normal" v-else>
            {{item.value | currency('', 0)}}
          </span>

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
