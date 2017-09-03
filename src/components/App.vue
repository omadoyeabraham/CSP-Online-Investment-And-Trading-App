<!-- The layout that the entire application uses.
      This layout houses the sidebar, and the "application work area" where different components are rendered based on the
      user's interaction with the application

      @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->
<template>
    <v-app toolbar>
    <Sidebar :isVisible="sidebarIsVisible"></Sidebar>
    <v-toolbar fixed class="blue darken-4" dark>
      <v-toolbar-side-icon @click.stop="sidebarIsVisible = !sidebarIsVisible"></v-toolbar-side-icon>
      <v-toolbar-title>TradeDirect</v-toolbar-title>
      <v-btn primary dark large class="ml-auto fund-account-btn elevation-23">Fund My Account</v-btn>
    </v-toolbar>
    <main>
        <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  // The state management store used that houses application wide state
  import store from '../store';

  import { mapState, mapMutations } from 'vuex';

  // Import the components that are rendered by the application base
  import Sidebar from './sidebar/Sidebar';
  import Navbar from './Navbar';

  export default
  {

    // Exposes the store for global state management to all components
    store,

    name: 'app',

    components: {
      Navbar,
      Sidebar
    },

    computed: mapState({
      'drawer': (store) => store.sidebarToggle
    }),

    methods: {
      ...mapMutations([
        'TOGGLE_SIDEBAR'
      ])
    },

    data () {
      return {
        sidebarIsVisible: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>

<style scoped lang="sass">
  #app
    height: 100%
    .fund-account-btn
      font-size: 1.5rem
</style>
