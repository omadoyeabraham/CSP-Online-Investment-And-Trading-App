<!-- The layout that the entire application uses.
      This layout houses the sidebar, and the "application work area" where different components are rendered based on the
      user's interaction with the application

      @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->
<template>

  <!-- <v-app id="app" class="bg-grey">


    <div class="row">
      <Navbar></Navbar>
    </div>


    <Sidebar class="bg-red"></Sidebar>

  </v-app> -->
   <v-app id="example-1" toolbar footer>
     <SidebarNew></SidebarNew>
    <v-toolbar class="indigo" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
      </v-container>
    </main>
    <v-footer class="indigo">
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  // Import the components that are rendered by the baseLayout
  import Sidebar from './components/sidebar/Sidebar';
  import SidebarNew from './components/sidebar/Sidebar-new';
  import Navbar from './components/Navbar';

  export default
  {
    name: 'app',
    components: {
      Navbar,
      Sidebar,
      SidebarNew
    },
    data () {
      return {
        drawer: true
      }
    }
  }
</script>

<style scoped lang="sass">
  #app
    height: 100%
</style>
