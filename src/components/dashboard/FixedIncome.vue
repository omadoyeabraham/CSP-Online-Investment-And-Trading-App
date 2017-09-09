<!--
  Component for the fixed income box on the dashboard

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

    <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <div class="w100p blue darken-3 p10">
      <div class="text-uppercase">TREASURY BILLS/ BONDS</div>
    </div>


      <div class="d-flex black--text">

        <!-- Treasury bills -->
        <div id="topGainers" class=" w50p">
          <div class="header w100p d-flex justify-content-between p5 pt10 pb10 font-weight-bold">
            <span>Tenor</span>
            <span>Yield(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5" v-for="(tbill, index) in treasuryBills" :key="index">
            <span>{{tbill.name}}</span>
            <span class="red--text">{{tbill.yield}}</span>
          </div>
        </div>

        <!-- Bonds-->
        <div id="topLosers" class="w50p">
          <div class="header w100p d-flex justify-content-between p5 pt10 pb10 font-weight-bold">
            <span>Tenor</span>
            <span>Yield(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5" v-for="(bond, index) in bonds" :key="index">
            <span>{{bond.name}}</span>
            <span class="green--text">{{bond.yield}}</span>
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
</style>
