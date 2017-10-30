<template>

  <RunningInvestments
   :showTotalValue="true"
    :currency="'₦'"
    :headerText="'Fixed Income - Active Investments'"
    :investmentType="'active'"
    :investmentTitle="'fixed income'"
    :investments="runningNairaInvestments">
  </RunningInvestments>

</template>

<script>
  import RunningInvestments from './RunningInvestments'

  import {mapGetters} from 'vuex'
  export default
  {
    components: {
      RunningInvestments
    },

    computed: {
      ...mapGetters({
        'runningNairaInvestments': 'getRunningNairaInvestments'
      })
    }
  }
</script>

<style>

</style>
