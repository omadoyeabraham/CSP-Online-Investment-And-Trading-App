<!--
  Component displaying market time
-->
<template>
  <div class="time-wrap">
    <!-- <span class="time pl10 pr5">{{datenow | moment("HH:mm")}}</span>
    <span class="date">{{datenow | moment("MMMM DD YYYY")}}</span> -->
  </div>
</template>

<script>
// import * as moment from 'moment'
export default {
  data () {
    return {
      datenow: ''
    }
  },

  mounted: function () {
    this.time()
  },

  methods: {
    time () {
      // var self = this
      this.datenow = new Date()

      // setInterval(self.time, 60000)
    }
  }

}
</script>

<style scoped lang="scss">
  .time-wrap {
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
