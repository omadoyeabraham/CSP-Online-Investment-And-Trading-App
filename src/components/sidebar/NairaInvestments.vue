<!--
  Displays the Naira Investments for the user
-->
<template>

  <v-list dense>

  {{stbOverview}}

    <template>
      <!-- Stockbroking (If user has STB) -->
      <v-list-group v-model="stbOverview.model" no-action class="red">

        <v-list-tile class="align-center w100p" slot="stbOverview">
          <div class="mr10">
            <v-icon>{{ stbOverview.model ? stbOverview.icon : stbOverview['icon-alt'] }}</v-icon>
          </div>
        </v-list-tile>

        <v-list-tile-content class="w100p">
          <v-list-tile-title class="font-size-11 w100p">
            <span style="float:left;">{{ stbOverview.text }}</span>
            <span style="float: right" class="mr0">
                <span>{{stbTotalValue | currency('&#8358;', 2)}}</span>
            </span>
          </v-list-tile-title>
        </v-list-tile-content>

      </v-list-group>
      <!-- EOF STB (if user has STB) -->


    </template>

  </v-list>

</template>

<script>
import {mapGetters} from 'vuex'
export default
{
  props: [
    'stbOverview',
    'stbTotalValue'
  ],

  ...mapGetters({
    'stbTotalValue': 'getStbTotalValue',
    'fiTotalValue': 'getFiTotalValue',
    'smaTotalValue': 'getSmaTotalEquityValue'
  })
}
</script>

<style>

</style>
