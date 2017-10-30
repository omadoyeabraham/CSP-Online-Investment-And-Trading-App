<template>
  <RunningInvestments
    :showTotalValue="true"
    :currency="'$'"
    :headerText="'Active Dollar Investments'"
    :investmentType="'active'"
    :investmentTitle="'dollar'"
    :investments="runningDollarInvestments">
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
      'runningDollarInvestments': 'getRunningDollarInvestments'
    })
  }
}
</script>

<style>

</style>
