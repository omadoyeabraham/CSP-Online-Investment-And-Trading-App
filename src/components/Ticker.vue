<!--
  Scrolling ticker used to display stock data
-->
<template>
<div class="ticker-wrap">
  <ul class="ticker">
    <li
      v-for="(item, index) in marketData" :key="index"
      class="ticker__item width-150px">
      <div class="height-20px ">
        {{item.name}}
      </div>

      <div class="white--text">
        <span class="grey--text font-weigth-normal mr2"> &#8358;{{item.lastTradePrice}}</span>
        <span class="mr2"> - </span>
        <span v-if="item.percentChange < 0" class="red--text">
          ({{Math.abs(item.percentChange) | currency('', 2)}})%
          <i class="fa fa-arrow-down"></i>
        </span>
        <span v-if="item.percentChange > 0" class="green--text">
          {{item.percentChange | currency('', 2)}}%
          <i class="fa fa-arrow-up"></i>
        </span>
        <span v-if="item.percentChange === 0" class="blue--text">
          {{item.percentChange | currency('', 2)}}%
          <i class="fa fa-window-minimize"></i>
        </span>
      </div>

    </li>
  </ul>
</div>
</template>

<script>
import StockbrokingService from '../services/StockbrokingService'
import * as mutationTypes from '../store/mutation-types'
import {mapState} from 'vuex'

export default {
  components: {
    StockbrokingService
  },

  beforeCreate () {
    let gettingMarketData = StockbrokingService.getMarketData()

    gettingMarketData.then((response) => {
      let allMarketData = response.data

      allMarketData.forEach((stockData) => {
        let priceChange = stockData.lastTradePrice - stockData.previousClose
        let priceChangePercent = (priceChange / stockData.previousClose) * 100

        stockData.priceChange = priceChange
        stockData.percentChange = priceChangePercent
      })

      // commit the market data to the stockbroking module of our vue store
      this.$store.commit(mutationTypes.SAVE_MARKET_DATA_TO_STORE, response.data)
    }).catch((error) => {
      console.log(error)
    })
  },

  computed: {
    ...mapState({
      'marketData': (store) => store.stockbroking.marketData
    })
  }
}
</script>

<style scoped lang="scss">
  $duration: 1050s;

  @-webkit-keyframes ticker {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes ticker {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  .ticker-wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    height: 4rem;
    background-color: #1a2155;
    padding-left: 100%;  // offset items to begin
  }

  .ticker {
    display: inline-block;
    height: 4rem;
    line-height: 4rem;
    white-space: nowrap; // display items in a line
    padding-right: 100%; // ensure items go before animations repeat (taken from parent due to inline-block)
    -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
  -webkit-animation-name: ticker;
          animation-name: ticker;
    -webkit-animation-duration: $duration;
            animation-duration: $duration;

    &__item {
      display: inline-block;
      padding: 0 2rem;
      font-size: 12px;
      font-weight: 700;
      color: white;
      border-right: 1px dotted #FFFFFF
    }

  }

</style>
