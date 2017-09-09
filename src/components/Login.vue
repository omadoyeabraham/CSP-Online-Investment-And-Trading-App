<!--
  This component displays the Login Page, and handles user authentication

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->

<template>

  <div class="form-group">
    <form action="">
          <input class="form-group" type="text" name="email" id="email" placeholder="Email Address" v-model="email_address">
          <input type="password" name="password" id="password" placeholder="Password" v-model="password">
          <input type="submit" value="Login" class="btn btn-primary">
    </form>
    {{email_address}}
    {{password}}
  </div>

</template>

<script>
  export default
  {
    data () {
      return {
        name: 'CardinalStone Trade Direct',
        email_address: '',
        password: ''
      }
    }
  }
</script>

<!-- Scoped styles apply only to this component -->
<style scoped>

</style>
