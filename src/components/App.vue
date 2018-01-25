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
         class="blue--text text--darken-4" data-toggle="tooltip" data-placement="top" title="MENU">
         <!-- <v-icon v-if="sidebarIsVisible" class="sidebar-arrow">keyboard_arrow_left</v-icon>
          <v-icon v-else class="sidebar-arrow">keyboard_arrow_right</v-icon> -->
        </v-toolbar-side-icon>
        <v-btn icon>
          <v-icon class="fa fa-user fa-5x"></v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-layout column>
        <v-flex style="margin-top: -10px">
          <span class="body-1 welcome">Welcome,
             <span v-if="userNameIsDefined" class="username">
              {{firstName.toLowerCase() | capitalize}}
              {{lastName.toLowerCase() | capitalize}}
             </span>
             <span v-else class="username">
               {{clientName.toLowerCase() | capitalize}}
             </span>
          </span>

          <span class="d-flex" style="margin-top: -2px">
            <v-icon class="logout-btn">lock</v-icon>
            <span class="red--text logout-link" @click="logout()">
              Logout
            </span>
          </span>

        </v-flex>

      </v-layout>

      <img src="https://portal.cardinalstone.com/broker/desktop/public/img/mainlogo.png"
      alt="" class="ml-auto">
    </v-toolbar>

    <main class="h-100">
        <router-view class="mb30 main-view"></router-view>
        <vue-progress-bar></vue-progress-bar>


         <Ticker
          v-if="['Login'].indexOf($route.name) !== 0"
          class="height-55px">

         </Ticker>
    </main>


  </v-app>
</template>

<script>
  // The state management store used that houses application wide state
  import store from '../store';
  import * as mutationTypes from '../store/mutation-types'
  import {mapState, mapGetters} from 'vuex'

  // Import the components that are rendered by the application base
  import Sidebar from './sidebar/Sidebar';
  import Navbar from './Navbar';
  import Ticker from './Ticker';

  export default
  {

    // Exposes the store for global state management to all components
    store,

    components: {
      Navbar,
      Sidebar,
      Ticker
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
        'firstName': 'getFirstName',
        'lastName': 'getLastName',
        'clientName': 'getClientName'
      }),

      /**
       * Determine if the user's first and last name is set
       *
      */
      userNameIsDefined: function () {
        return ((this.firstName !== 'undefined') && (this.lastName !== 'undefined'))
      }
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
        // let logOutUser = AuthenticationService.logout(this.user.userID)

        // logOutUser.then((response) => {
        //   // Clear previously saved data before logging into the system again
        //   window.sessionStorage.clear()

        //   // Clear the stb store before logging in
        //   store.commit(mutationTypes.CLEAR_STOCKBROKING_STORE)

        //   // Clear the user store before logging in
        //   store.commit(mutationTypes.CLEAR_USER_STORE)

        //   // Redirect to the login page
        //   this.$router.push({ name: 'Login' })
        // }).catch((error) => {
        //   console.log(error)
        // })

        // // Reset the various stores to their default states
        // store.commit(mutationTypes.CLEAR_STOCKBROKING_STORE)

        // Clear the stb store before logging in
        store.commit(mutationTypes.CLEAR_STOCKBROKING_STORE)

        // Clear the user store before logging in
        store.commit(mutationTypes.CLEAR_USER_STORE)

        // Clear previously saved data before logging into the system again
        window.sessionStorage.clear()

        // Redirect to the login page
        this.$router.push({ name: 'Login' })
      }
    }
  }
</script>

<style scoped lang="sass">
  .main-view
    background-image: url('../../static/img/bg-5.jpg')
    background-repeat: repeat
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

  .sidebar-arrow
    color: #1a2155 !important
    font-size: 45px
    font-weight: 900

</style>
