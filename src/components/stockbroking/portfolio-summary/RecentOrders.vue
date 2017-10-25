<!--
  Recently placed orders
-->
<template>
  <v-card class="white lighten-2 card h-100" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">RECENT ORDERS</div>
    </div>

    <!-- Card body -->
    <div class="card-block pt0">
     <!-- {{ recentTradeOrders }} -->
     <table class="table mb20" id="recentOrdersTable">
       <thead>
         <th></th>
         <th class="">TYPE</th>
         <th class="text-right">UNITS</th>
         <th class="text-right">EXEC</th>
         <th class="text-right pl10">STATUS</th>
       </thead>
       <tbody>
         <tr v-for="(order,index) in recentTradeOrders" :key="index">
           <td>{{order.instrument}}</td>
           <td>{{order.orderType}}</td>
           <td class="text-right">{{order.quantityRequested | currency('',0)}}</td>
           <td class="text-right">{{order.quantityFilled | currency('',0)}}</td>
           <td class="text-right pl10">{{order.cspOrderStatus}}</td>
         </tr>
       </tbody>
     </table>

     <router-link class="blue--text mt30 font-size-11 emulate-link" :to="'/stb/trade-history'">
       <i class="fa fa-chevron-right"></i> More Orders
     </router-link>
    </div>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default
{
  props: ['currentPortfolio'],

  computed: {
    ...mapGetters({
      'currentPortfolioTotalValue': 'currentPortfolioTotalValue',
      'currentPortfolioGainOrLoss': 'currentPortfolioGainOrLoss',
      'currentPortfolioGainOrLossPercentage': 'currentPortfolioGainOrLossPercentage',
      'currentPortfolioAcquisitionCost': 'currentPortfolioAcquisitionCost',
      'recentTradeOrders': 'getRecentTradeOrders'
    })
  }
}
</script>

<style scoped lang="sass">
  #recentOrdersTable
    thead
      th
        color: #000000
        font-weight: bold !important
    tbody
      tr
        td
          font-size: 11px !important
  .emulate-link
    &:hover
      cursor: pointer
      text-decoration: underline
</style>

