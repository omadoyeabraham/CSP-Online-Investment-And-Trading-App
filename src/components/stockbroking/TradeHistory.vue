<!--
  Shows the client's stockbroking trade history

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <div>

  {{tradeOrders}}

  </div>
</template>

<script>
  // The stockbroking service
  import StockbrokingService from '../../services/StockbrokingService';

  import {mapState} from 'vuex';

  export default
  {
    // Actions to be carried out before this component is created. Ensures that the component has the necessary data to be rendered
    beforeCreate () {
      StockbrokingService.getTradeOrders();
    },

    data () {
      return {

      }
    },

    computed: mapState({
      'tradeOrders': (store) => store.stockbroking.tradeOrders
    })

  }
</script>

<style>

</style>
