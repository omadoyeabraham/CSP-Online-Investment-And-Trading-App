<template>
      <!-- Account Actions -->
      <v-list dense>
        <template v-for="(item, i) in accountActions">
          <v-list-tile :key="i" v-if="item.action" >
            <div class="mr10">
              <v-icon class="sidebar-icon">{{ item.icon }}</v-icon>
            </div>
            <v-list-tile-content>
              <v-list-tile-title class="font-size-11" style="overflow: hidden">
                <router-link :to="item.link" >{{ item.action }}</router-link>
                <v-chip
                  class="red white--text font-size-10"
                  style="height: 20px"
                  v-if="item.new">
                  New</v-chip>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
</template>

<script>
  export default {
    props: ['accountActions'],
    data () {
      return {

      }
    }
  }
</script>

<style scoped lang="sass">
    .sidebar-icon
      color: #8fb0cc !important

</style>
