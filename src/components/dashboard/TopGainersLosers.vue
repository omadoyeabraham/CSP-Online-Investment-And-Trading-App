<template>

    <v-card class="white lighten-2 card h-100" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">TOP GAINERS AND LOSERS</div>
    </div>


      <div class="d-flex black--text">

        <!-- Top Gainers -->
        <div id="topGainers" class=" w50p">
          <div class="header w100p d-flex justify-content-between p5 pt10 pb10 font-weight-bold">
            <span>Gainers</span>
            <span>Change(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5 pt10 pb10" v-for="(gainer, index) in topGainers" :key="index">
            <span>{{gainer.symbol}}</span>
            <span class="green--text">{{gainer.change}}</span>
          </div>
        </div>

        <!-- Top Losers -->
        <div id="topLosers" class="w50p">
          <div class="header w100p d-flex justify-content-between p5 pt10 pb10 font-weight-bold">
            <span>Losers</span>
            <span>Change(%)</span>
          </div>
          <div class="content w100p d-flex justify-content-between p5 pt10 pb10" v-for="(loser, index) in topLosers" :key="index">
            <span>{{loser.symbol}}</span>
            <span class="red--text">({{loser.change}})</span>
          </div>
        </div>

    </div>

  </v-card>

</template>

<script>
  export default
  {
    props: ['topGainers', 'topLosers']
  }

</script>

<style scoped lang="sass">
  .header, .content
    border-bottom: 1px solid #ccc
    padding: 10px 10px
  .content:last-of-type
    border-bottom: none
</style>
