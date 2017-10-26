<!--
  Component for the reset password module
-->

<template>
  <v-container fluid>

    <!-- HEADER -->
    <v-layout row>
      <v-flex class="font-size-20 csp-light-blue-text">Reset Password</v-flex>
    </v-layout> <hr>

    <!-- Form and Privacy Content -->
    <v-layout row>

      <!-- Fund Account Form -->
      <v-flex xs4>
        <ResetPasswordForm>
        </ResetPasswordForm>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
import ResetPasswordForm from './ResetPasswordForm'

export default {
  components: {
    ResetPasswordForm
  }
}
</script>

<style scoped lang="sass">

</style>
