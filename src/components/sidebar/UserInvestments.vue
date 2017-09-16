<!--
  This component displays the various types of investments that the user has.

  @prop AccountInvestments | The various investments the user has, contains a name, total value and child items (where applicable)
  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>

  <v-list dense>
    <template v-for="(item, i) in AccountInvestments">

      <!-- For nav-items with dropdown children -->
      <v-list-group v-if="item.children" v-model="item.model" no-action>
        <v-list-tile slot="item">
          <div class="mr10">
            <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
          </div>
          <v-list-tile-content>
            <v-list-tile-title class="font-size-11">
              <span style="float:left;">{{ item.text }}</span>
              <span style="float:right;"> &#8358;{{item.totalValue}}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(child, i) in item.children" :key="i">
          <v-list-tile-action v-if="child.icon">
            <v-icon class="font-size-11">{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to='child.link' class="font-size-11">
              {{ child.text }}
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <!-- EOF of nav-items with dropdown -->

      <!-- Nav items without a dropdown -->
      <v-list-tile :key="i" v-else>
        <div class="mr10">
          <v-icon>{{ item.icon }}</v-icon>
        </div>
        <v-list-tile-content>
          <v-list-tile-title class="font-size-11">
            <span style="float: left">{{ item.text }}</span>
            <span style="float:right">&#8358;{{item.totalValue}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </template>
  </v-list>

</template>

<script>
  export default
  {
    props: ['AccountInvestments'],

    data () {
      return {

      }
    }

  }

</script>

<style>

</style>
