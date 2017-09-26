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
              <li class="list-group-item font-weight-bold">
                Opening Balance
                <span class="ml-auto font-weight-normal"></span>
              </li>
              <li class="list-group-item">
                Total Credit
                <span class="ml-auto "></span>
              </li>
              <li class="list-group-item ">
                Total Debit
                <span class="ml-auto font-weight-normal"></span>
              </li>
              <li class="list-group-item font-weight-bold">
                Closing Balance
                <span class="ml-auto font-weight-normal"></span>
              </li>
              <li class="list-group-item">
                Uncleared Effects
                <span class="ml-auto font-weight-normal"></span>
              </li>
              <li class="list-group-item font-weight-bold">
                Cash Available
                <span class="ml-auto font-weight-normal"></span>
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
          <div class="card-block red">
            {{cashStatements}}
          </div>

        </v-card>
      </v-flex>

    </v-layout>


  </v-container>
</template>

<script>
  export default
  {
    props: ['cashStatements']
  }
</script>

<style>

</style>
