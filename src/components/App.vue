<template>
  <v-app class="h-100" toolbar>

    <!-- Sidebar -->
    <Sidebar
    class="elevation-5"
    :isVisible="sidebarIsVisible"
    v-if="['Login'].indexOf($route.name) !== 0">
    </Sidebar>

    <!-- Horizontal Naviagtion bar -->
    <v-toolbar class="grey lighten-4 elevation-1" fixed
      v-if="['Login', 'Register', 'PageNotFound'].indexOf($route.name) !== 0">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="sidebarIsVisible = !sidebarIsVisible"
         class="blue--text text--darken-4">
        </v-toolbar-side-icon>
        <v-btn icon>
          <v-icon class="fa fa-user fa-5x"></v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-layout column>
        <v-flex>
          <span class="body-1 welcome">Welcome, </span>
          <span class=" username">
            {{user.info.firstName.toLowerCase() | capitalize}}
            {{user.info.lastName.toLowerCase() | capitalize}}
          </span>
        </v-flex>
        <v-flex>
          <v-icon class="logout-btn">lock</v-icon>
          <span class="red--text logout-link"
            @click="logout()">
            Logout
          </span>
        </v-flex>
      </v-layout>
      <img src="https://portal.cardinalstone.com/broker/desktop/public/img/mainlogo.png"
      alt="" class="ml-auto">
    </v-toolbar>

    <main class="h-100">
        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>
    </main>

  </v-app>
</template>

<script>
  // The state management store used that houses application wide state
  import store from '../store';

  import {mapState, mapGetters} from 'vuex'

  // Import the components that are rendered by the application base
  import Sidebar from './sidebar/Sidebar';
  import Navbar from './Navbar';

  export default
  {

    // Exposes the store for global state management to all components
    store,

    components: {
      Navbar,
      Sidebar
    },

    data () {
      return {
        sidebarIsVisible: true,
        right: null
      }
    },

    computed: {
      ...mapState({
        'user': (store) => store.user
      }),

      ...mapGetters({
        'username': 'getUsername'
      })
    },

    mounted () {
      // [App.vue specific] When App.vue is finished loading finish the progress bar
      this.$Progress.finish()
    },

    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start();

      // Hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        // Does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        // start the progress bar
        this.$Progress.start()
        // continue to the next page
        next()
      })

      // hook the progress bar to finish after we've finished moving the router-view
      this.$router.afterEach((to, from) => {
        // finish the progress bar
        this.$Progress.finish()
      })
    },

    methods: {
      logout: function () {
        // Clear the data saved in local storage
        window.sessionStorage.clear()

        // Redirect to the login page
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>

<style scoped lang="sass">

  .logout-btn
    font-size: 11px

  .username
    font-size: 30px
    font-family: "Verdana"
    color: #666

  .logout-link
    &:hover
      cursor: pointer

  .welcome
    color: #a6a4be

</style>
