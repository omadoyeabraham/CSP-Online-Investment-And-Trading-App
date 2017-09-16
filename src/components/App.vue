<!-- The layout that the entire application uses.
      This layout houses the sidebar, and the "application work area" where different components are rendered based on the
      user's interaction with the application

      @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->
<template>
    <div class="h-100">
    <main class="h-100">
        <router-view></router-view>
    </main>
  </div>
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
