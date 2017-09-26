<!--
  This component controls the summary tab under naira cash accounts

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid grid-list-lg>
    <v-layout row>

      <!-- Statement summary -->
      <v-flex sm4>
        <v-card class="white lighten-2 card h-100" dark>

          <div class="w100p bg-csp-light-blue p10">
            <div class="text-uppercase">STATEMENTS SUMMARY</div>
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
      </v-flex>

      <!-- Uncleared Effects -->
      <v-flex sm8>
        <v-card class="white lighten-2 card h-100" dark>

          <div class="w100p bg-csp-light-blue p10">
            <div class="text-uppercase">UNCLEARED EFFECTS</div>
          </div>

          <!-- Card body -->
          <div class="card-block">
          </div>

        </v-card>
      </v-flex>

    </v-layout>


  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
