<!--
  This component displays the various types of investments that the user has.

  @prop AccountInvestments | The various investments the user has, contains a name, total value and child items (where applicable)
  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-list dense class="p0">
    <template v-for="(item, i) in AccountInvestments">

      <!-- For nav-items with dropdown children -->
      <v-list-group v-if="item.children" v-model="item.model" no-action>

        <v-list-tile  slot="item" style="height: 30px"
         class=" align-center w100p ">
          <div class="mr10">
            <v-icon class="sidebar-icon">{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
          </div>
          <v-list-tile-content class="w100p">
            <v-list-tile-title class="font-size-11 w100p">
              <span style="float:left;" >{{ item.text }}</span>

              <!-- Stockbroking -->
              <span style="float: right" class="mr0" v-if="item.isSTB">
                <span v-if="userHasStb">{{stbTotalValue | currency('&#8358;', 2)}}</span>
                <span v-else>---</span>
              </span>

              <!-- Fixed income -->
              <span style="float: right" class="mr0" v-if="item.isFI">
                {{fiTotalValue | currency('&#8358;', 2)}}
              </span>

              <!-- Dollar investments -->
               <span style="float:right" v-else-if="item.isDollarInvestments">
                {{dollarInvestmentsTotalValue | currency('&#36;',2)}}
              </span>

            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- Only show the STB dropdowns if the user actually has STB -->
        <template v-if="item.isSTB">
          <template v-if="userHasStb">
          <v-list-tile   v-for="(child, i) in item.children"
            :key="i" style="height: 30px"
            class="d-flex align-center justify-between">
            <!-- <v-list-tile-action v-if="child.icon">
              <v-icon class="font-size-11">{{ child.icon }}</v-icon>
            </v-list-tile-action> -->
            <v-list-tile-content class="pt0 pb0">
              <router-link :to="{name: child.routeName}" class="font-size-11 pt0 pb0 ml25">
               <v-icon class="font-size-11 fa fa-chevron-right mr10 sidebar-icon" v-if="child.icon"></v-icon>
               {{ child.text }}
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
          </template>
        </template>

        <!-- render the dropdowns for all non STB categories that have dropdowns -->
        <template v-else>
          <v-list-tile   v-for="(child, i) in item.children"
            :key="i" style="height: 30px"
            class="d-flex align-center justify-between">
            <!-- <v-list-tile-action v-if="child.icon">
              <v-icon class="font-size-11">{{ child.icon }}</v-icon>
            </v-list-tile-action> -->
            <v-list-tile-content>
              <router-link :to="{name: child.routeName}" class="font-size-11 ml25">
                <v-icon class="font-size-11 fa fa-chevron-right mr10 sidebar-icon"></v-icon>
                {{ child.text }}
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </template>

      </v-list-group>
      <!-- EOF of nav-items with dropdown -->


      <!-- Nav items without a dropdown -->
      <v-list-tile class="sidebar-item hover" :key="i" v-else style="height: 30pxs"
        >
        <div class="mr10">
          <v-icon class="sidebar-icon">{{ item.icon }}</v-icon>
        </div>
        <v-list-tile-content>


            <router-link :to="{name: item.routeName}" class="font-size-11 hover w100p">
              <span>{{item.text}}</span>
               <span style="float:right" v-if="item.isNairaCashBalance">
                 {{totalNairaCashBalance | currency('&#8358;',2)}}
              </span>
              <span style="float:right" v-else-if="item.isDollarCashBalance">
                 {{totalDollarCashBalance | currency('&#36;',2)}}
              </span>
              <span style="float:right" v-else-if="item.isTotalForDollarInvestments" class="font-weight-bold">
                 {{totalForDollarInvestments | currency('&#36;',2)}}
              </span>
              <span style="float:right" v-else-if="item.isTotalForNairaInvestments" class="font-weight-bold">
                 {{totalForNairaInvestments | currency('&#8358;',2)}}
              </span>
              <span style="float:right" v-else-if="item.isSma">
                 {{totalValueOfSmaInvestments | currency('&#8358;',2)}}
              </span>
              <span style="float:right" v-else>{{item.totalValue}}</span>
            </router-link>

        </v-list-tile-content>
      </v-list-tile>

    </template>
  </v-list>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default
  {
    props: ['AccountInvestments'],

    data () {
      return {
        child: {
          link: ' '
        }
      }
    },

    computed: {
      ...mapState({
        'user': (store) => store.user,
        'userHasStb': (store) => store.stockbroking.userHasStb
      }),

      ...mapGetters({
        'stbTotalValue': 'getStbTotalValue',
        'fiTotalValue': 'getFiTotalValue',
        'smaTotalValue': 'getSmaTotalEquityValue',
        'dollarInvestmentsTotalValue': 'getDollarInvestmentsTotalValue',
        'totalNairaCashBalance': 'getTotalNairaCashBalance',
        'totalDollarCashBalance': 'getTotalDollarCashBalance',
        'totalNairaSmaCashBalance': 'getTotalNairaSmaCashBalance'
      }),

      // The total value shown for dollar investments
      totalForDollarInvestments: function () {
        let total = parseFloat(this.dollarInvestmentsTotalValue) + parseFloat(this.totalDollarCashBalance)

        return total
      },

      // The total value shown for naira investments
      totalForNairaInvestments: function () {
        let total = parseFloat(this.stbTotalValue) + parseFloat(this.fiTotalValue) + parseFloat(this.totalNairaCashBalance) + parseFloat(this.totalValueOfSmaInvestments)

        return total
      },

      totalValueOfSmaInvestments: function () {
        return parseFloat(this.smaTotalValue) + parseFloat(this.totalNairaSmaCashBalance)
      }

    }

  }

</script>

<style scoped lang="sass">
  .sidebar-item:last-of-type
    border-top: 1px solid #EEEEEE
    margin-top: 0px
  .sidebar-item:last-of-type span
    font-weight: bold
  .sidebar-item > div
    background: red
    height: 30px
  .sidebar-item .list__title
    height: 30px
  .hover
    &:hover
      background: #DDDDDD
      cursor: pointer
      a
        &:hover, &:focus
          text-decoration: none

  .sidebar-icon
    color: #8fb0cc

</style>
