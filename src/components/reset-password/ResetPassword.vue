<!--
  Component for the reset password module
-->

<template>
  <v-container fluid>

    <!-- HEADER -->
    <v-layout row>
      <v-flex class="font-size-20 csp-light-blue-text">Reset Password</v-flex>
    </v-layout> <hr>

    <!-- Form-->
    <v-layout row>

      <!-- Fund Account Form -->
      <v-flex xs4>
        <ResetPasswordForm>
        </ResetPasswordForm>
      </v-flex>

    </v-layout>

    <!--Password Policy -->
    <v-layout row class="mt50">
      <v-flex xs6>
        <password-policy></password-policy>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import ResetPasswordForm from './ResetPasswordForm'
import PasswordPolicy from './PasswordPolicy'

export default {
  components: {
    ResetPasswordForm,
    PasswordPolicy
  }
}
</script>

<style scoped lang="sass">

</style>
