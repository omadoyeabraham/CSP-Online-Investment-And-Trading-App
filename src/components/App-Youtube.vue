<template>
  <v-app
    dark
    toolbar
  >
    <v-navigation-drawer
      class="pb-0"
      persistent
      height="100%"
      clipped
      absolute
      enable-resize-watcher
      v-model="drawer"
    >

    </v-navigation-drawer>
    <v-toolbar class="white" fixed>
      <v-toolbar-title>
        <v-toolbar-side-icon class="blue--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="ml-3">fa-youtube</v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <img src="https://portal.cardinalstone.com/broker/desktop/public/img/mainlogo.png"
      alt="" class="ml-auto">
    </v-toolbar>
    <main>
      <v-container fill-height>
        <v-layout>
          <v-flex xs12>
            <v-card height="300px"></v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>


<script>
  export default {
    data: () => ({
      drawer: true,
      items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
        { icon: 'featured_play_list', text: 'Playlists' },
        { icon: 'watch_later', text: 'Watch Later' }
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' }
      ]
    })
  }
</script>
