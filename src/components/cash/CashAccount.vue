<!--
  This component is the parent component for the entire cash account page

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <cash-account-header
    :cashAccounts = "nairaCashAccounts">
  </cash-account-header>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CashAccountHeader from './CashAccountHeader'
  export default
  {
    components: {
      CashAccountHeader
    },

    computed: {
      ...mapGetters({
        'nairaCashAccounts': 'getNairaCashAccounts'
      })
    }
  }
</script>

<style>

</style>
