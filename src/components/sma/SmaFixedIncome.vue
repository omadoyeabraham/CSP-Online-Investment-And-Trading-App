<template>

  <sma-fixed-income-investments
   :showTotalValue="true"
    :currency="'₦'"
    :investmentType="'active'"
    :investmentTitle="'fixed income'"
    :investments="smaFixedIncomeInvestments">
  </sma-fixed-income-investments>

</template>

<script>
  import smaFixedIncomeInvestments from './SmaFixedIncomeInvestments'

  import {mapGetters} from 'vuex'
  export default
  {
    components: {
      smaFixedIncomeInvestments
    },

    computed: {
      ...mapGetters({
        'smaFixedIncomeInvestments': 'getSmaFixedIncomeInvestments'
      })
    }
  }
</script>

<style>

</style>
