<!--
  Portfolio Summary box for the SMA section
-->
<template>


  <v-card class="white lighten-2 card h-100 min-height-250px" dark>

    <div class="w100p bg-csp-light-blue p10">
      <div class="text-uppercase">PORTFOLIO SUMMARY</div>
    </div>

    <!-- Card body -->
    <div class="card-block">
      <ul class="list-group list-group-flush black--text">

        <!-- <li class="list-group-item">
          BONDS
          <span class="ml-auto font-weight-normal" >

          </span>
        </li> -->

        <li class="list-group-item">
          EQUITIES
          <span class="ml-auto font-weight-normal" >
             {{smaEquitiesTotal | currency('&#8358; ',2)}}
          </span>
        </li>

        <!-- <li class="list-group-item">
          FIXED INCOME
          <span class="ml-auto font-weight-normal" >

          </span>
        </li> -->

        <!-- <li class="list-group-item">
          REAL ESTATE
          <span class="ml-auto font-weight-normal" >

          </span>
        </li> -->

        <li class="list-group-item">
          CASH / MONEY ON CALL
          <span class="ml-auto font-weight-normal" >
             {{smaCashTotal | currency('&#8358; ',2)}}
          </span>
        </li>

         <li class="list-group-item p15">
          <span class="ml-auto font-weight-normal" >

          </span>
        </li>

        <li class="list-group-item font-weight-bold">
          NET VALUE OF PORTFOLIO
          <span class="ml-auto font-weight-bold" >
            {{smaPortfolioTotal | currency('&#8358; ',2)}}
          </span>
        </li>

      </ul>
    </div>

  </v-card>


</template>

<script>
export default
{
  props: [
    'smaEquitiesTotal',
    'smaCashTotal',
    'smaPortfolioTotal'
  ]
}
</script>

<style>

</style>
