<!--
  The HOME components represents the homepage with an overview of the clients portfolio, upon login

  @author <omadoyeabraham@gmail.com>
 -->

<template>
  <div class="container-fluid h-100">

    <div class="row">
      <Navbar></Navbar>
    </div>

    <div class="row h-100">
        <div class="hidden-xs-down p0 col-sm-5 col-lg-3 ">
          <Sidebar></Sidebar>
        </div>
        <div class="col-sm-7 col-lg-9 bg-green">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eos recusandae doloribus? Hic praesentium nam iste doloremque dolorem. Corrupti repellendus obcaecati mollitia, consequuntur nisi culpa voluptas sapiente perspiciatis sit voluptatum.</p>
        </div>
    </div>

  </div>
</template>

<script>
  // Import other components that are rendered by the homepage
  import Sidebar from './Sidebar';
  import Navbar from './Navbar';

  export default
  {
    components: {
      Sidebar,
      Navbar
    }
  };
</script>

<style scoped>

</style>
