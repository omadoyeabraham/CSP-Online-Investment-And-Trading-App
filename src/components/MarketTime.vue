<!--
  Component displaying market time
-->
<template>
  <div class="ticker-wrap">
    <span class="time pl10 pr5">{{date | moment("HH:m")}}</span>
    <span class="date">{{date | moment("MMMM DD YYYY")}}</span>
  </div>
</template>

<script>
import * as moment from 'moment'
export default {
  computed: {
    date: function () {
      let today = new Date()

      return moment(today, 'YYYY-MM-DD')
    }
  }

}
</script>

<style scoped lang="scss">
  .ticker-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 4rem;
    background-color: #1a2155;
  }

  .time {
    font-size: 40px !important;
    font-weight: 400;
    color: #FFFFFF;
  }

  .date {
    font-weight: 200;
    font-size: 14px;
    color: #FFFFFF;
  }

</style>
