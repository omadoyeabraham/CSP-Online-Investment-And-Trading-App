<template>
      <!-- Client Accounts -->
      <v-list dense>
        <template v-for="(item, i) in accountTypes">

          <!-- For nav-items with dropdown children -->
          <v-list-group v-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item">
              <div class="mr10">
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </div>
              <v-list-tile-content>
                <v-list-tile-title>
                  <span style="float: left">{{ item.text }}</span> <span style="float:right">N{{item.totalValue}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <!-- EOF of nav-items with dropdown -->

          <v-list-tile :key="i" v-else >
            <div class="mr10">
              <v-icon>{{ item.icon }}</v-icon>
            </div>
            <v-list-tile-content>
              <v-list-tile-title>
                <span style="float: left">{{ item.text }}</span>
                <span style="float:right">N{{item.totalValue}}</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
</template>

<script>
  export default {
    props: ['accountTypes'],
    data () {

    }
  }
</script>

<style>

</style>
