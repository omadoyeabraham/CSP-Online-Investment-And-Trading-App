<template>
  <RunningInvestments
   :showTotalValue="false"
    :currency="'$'"
    :headerText="'Terminated Dollar Investments'"
    :investmentType="'terminated'"
    :investmentTitle="'dollar'"
    :investments="terminatedDollarInvestments">
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
      'terminatedDollarInvestments': 'getTerminatedDollarInvestments'
    })
  }
}
</script>

<style>

</style>
