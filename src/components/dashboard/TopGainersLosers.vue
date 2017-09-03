<template>

    <v-card class="white lighten-2 card" dark>

    <!-- Heading -->
    <div class="w100p blue darken-3 p10">
      <div class="text-uppercase">TOP GAINERS AND LOSERS</div>
    </div>


      <div class="d-flex black--text">

        <!-- Top Gainers -->
        <div id="topGainers" class=" w50p">
          <div class="header w100p d-flex justify-content-between p5 font-weight-bold">
            <span>Gainers</span>
            <span>Change(%)</span>
          </div>
        </div>

        <!-- Top Losers -->
        <div id="topLosers" class="w50p">
          <div class="header w100p d-flex justify-content-between p5 font-weight-bold">
            <span>Losers</span>
            <span>Change(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5">
            <span>Losers</span>
            <span>Change(%)</span>
          </div>
        </div>

    </div>

  </v-card>

</template>

<script>
export default {

}
</script>

<style scoped lang="sass">
  .header
    border-bottom: 1px solid #ccc
</style>
