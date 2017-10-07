<!--
  Displays the table showing all of a user's watchLists
-->
<template>
  <v-container fluid class="p0">
    <v-layout row>
      <v-flex xs12>
        <table class="table elevation-1" id="watchListTable">
          <thead class="bg-csp-light-blue white--text">
            <th>STOCK</th>
            <th>CONDITION</th>
            <th>CUR PRICE (&#8358;)</th>
            <th>% CHANGE</th>
            <th>ALERT</th>
            <th></th>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in userWatchList"
              :key="index">
              <td>{{item.name}}</td>
              <td>{{item.condition}} {{item.notify_price}}</td>
              <td>{{item.currentPrice}}</td>
              <td>{{item.priceChange | currency('',2)}}</td>
              <td>
                 <button v-if="item.status === '0'" class="button button-blue-csp elevation-2 mb2"
                   >
                    ENABLE
                  </button>
                  <button v-else class="button button-blue-csp elevation-2 mb2"
                   >
                    DISABLE
                  </button>
              </td>
              <td>
                <v-icon class="red--text">delete</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default
{
  props: ['userWatchList']
}
</script>

<style scoped lang="sass">
  #watchListTable
    thead
      th
        font-size: 11px
        color: #FFFFFF
</style>
