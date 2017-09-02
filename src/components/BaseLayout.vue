<!-- The layout that the entire application uses.
      This layout houses the sidebar, and the "application work area" where different components are rendered based on the
      user's interaction with the application

      @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->
<template>
<v-app>
  <v-navigation-drawer class="bg-green"></v-navigation-drawer>
  <v-toolbar class="bg-red"></v-toolbar>
  <main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </main>
  <v-footer></v-footer>
</v-app>
</template>

<script>
  // Import the components that are rendered by the baseLayout
  import Sidebar from './sidebar/Sidebar';
  import Navbar from './Navbar';

  export default
  {
    components: {
      Sidebar,
      Navbar
    }
  };
</script>

<style>

</style>
