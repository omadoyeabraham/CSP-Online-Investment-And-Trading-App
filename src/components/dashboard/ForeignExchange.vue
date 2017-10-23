<!--
  Component for the Foreign Exchange box on the dashboard

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

    <v-card class="white lighten-2 card h-100 height-250px" dark>

    <!-- Heading -->
    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">FOREIGN EXCHANGE</div>
    </div>


    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">
        <li class="list-group-item font-weight-bold pt5 pb5" v-for="(item, index) in foreignExchange" :key="index">{{item.label}}

          <!-- Other Items -->
          <span class="ml-auto font-weight-normal">
            &#8358; {{item.value | currency('', 2)}}
          </span>

        </li>
      </ul>
    </div>

  </v-card>

</template>

<script>
  // import { mapState } from 'vuex';

  export default
  {
    props: ['foreignExchange']
    // computed: mapState({
    //   'treasuryBills': (store) => store.marketData.treasuryBills,
    //   'bonds': (store) => store.marketData.bonds
    // })
  }

</script>

<style scoped lang="sass">
  .header, .content
    border-bottom: 1px solid #ccc
    padding: 10px 10px
  .content:last-of-type
    border-bottom: none
</style>
