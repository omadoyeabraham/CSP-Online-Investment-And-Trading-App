<!--
  The HOME components represents the homepage with an overview of the clients portfolio, upon login

  @author <omadoyeabraham@gmail.com>
 -->

<template>

    <div class="row h-100">
        <div class="col-sm-12 col-lg-12 bg-grey">
          <Dashboard></Dashboard>
        </div>
    </div>

</template>

<script>
  // Import other components that are rendered by the homepage
  import Dashboard from './dashboard/Dashboard';

  export default
  {
    components: {
      Dashboard
    }
  };
</script>

<style scoped>

</style>
