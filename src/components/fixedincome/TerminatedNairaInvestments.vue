<template>
  <RunningInvestments
   :showTotalValue="false"
    :currency="'₦'"
    :headerText="'Fixed Income - Terminated Investments'"
    :investmentType="'terminated'"
    :investmentTitle="'fixed income'"
    :investments="terminatedNairaInvestments">
  </RunningInvestments>
</template>

<script>
import RunningInvestments from './RunningInvestments'

import { mapGetters } from 'vuex'
export default
{
  components: {
    RunningInvestments
  },

  computed: {
    ...mapGetters({
      'terminatedNairaInvestments': 'getTerminatedNairaInvestments'
    })
  }
}
</script>

<style>

</style>
