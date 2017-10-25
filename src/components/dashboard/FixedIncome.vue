<!--
  Component for the fixed income box on the dashboard

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

    <v-card class="white lighten-2 card h-100 height-250px" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">TREASURY BILLS/ BONDS</div>
    </div>


      <div class="d-flex black--text">

        <!-- Treasury bills -->
        <div id="topGainers" class=" w50p">
          <div class="header w100p d-flex justify-content-between p5 pt15 pb15 font-weight-bold">
            <span>Tenor</span>
            <span>Yield(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5 pb15 pt15" v-for="(tbill, index) in treasuryBills" :key="index">
            <span class="font-weight-bold">{{tbill.name}}</span>
            <span class="text-csp-light-blue font-weight-bold pr3">{{tbill.yield}}</span>
          </div>
        </div>

        <!-- Bonds-->
        <div id="topLosers" class="w50p">
          <div class="header w100p d-flex justify-content-between p5 pt15 pb15 font-weight-bold">
            <span>Tenor</span>
            <span>Yield(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5 pb15 pt15" v-for="(bond, index) in bonds" :key="index">
            <span class="font-weight-bold">{{bond.name}}</span>
            <span class="text-csp-light-blue font-weight-bold">{{bond.yield}}</span>
          </div>
        </div>

    </div>

  </v-card>

</template>

<script>
  import { mapState } from 'vuex';

  export default
  {
    computed: mapState({
      'treasuryBills': (store) => store.marketData.treasuryBills,
      'bonds': (store) => store.marketData.bonds
    })
  }

</script>

<style scoped lang="sass">
  .header, .content
    border-bottom: 1px solid #ccc
    padding: 10px 10px
  .content:last-of-type
    border-bottom: none
</style>
