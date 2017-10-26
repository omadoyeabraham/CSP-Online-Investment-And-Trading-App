<template>

  <v-container fluid class="p0">
    <v-card>

      <v-card-title primary-title class="bg-csp-blue white--text height-35px p2 d-flex justify-start">
        <h5 class="headline pl15 mb-0 font-size-12 text-uppercase">
        </h5>
      </v-card-title>

      <v-card-media>
        <v-container fluid class="pt0 pl1 pr1">
          <v-layout row>
            <v-form v-model="valid" ref="form" class="w100p">

             <v-layout row class="pl20 pr20 pt10">

                <!-- Current Password -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'Current Password'" v-model="oldPassword"
                    :type="'password'" :rules="oldPasswordRules" class=""
                    v-validate="'required'" name="oldPassword">
                  </v-text-field>
                </v-flex>

                <!-- New Password -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'New Password'" v-model="newPassword"
                    :type="'password'" :rules="newPasswordRules"
                    v-validate="'required'" name="newPassword">
                  </v-text-field>
                </v-flex>

                <!-- Confirm Password -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'Confirm Password'" v-model="confirmPassword"
                    :type="'password'" :rules="confirmPasswordRules"
                    v-validate="'required'" name="confirmPassword">
                  </v-text-field>
                </v-flex>

              </v-layout>

              <!-- Loading Icon when resetting password -->
              <v-layout v-if="changingPassword"  row class=" d-flex justify-center ">
                <v-flex class="xs6 d-flex justify-center align-center mt20">
                  <!-- <span class="font-size-10">Calculating Order Cost</span> -->
                  <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                  <span class="font-size-12 ml5">Resetting Password</span>
                </v-flex>
              </v-layout>

              <!-- Buttons -->
              <v-layout row class="mt20 ml2">
                <v-flex xs6 class="d-flex justify-start">
                  <v-btn style="background: #4c7396; color: #FFFFFF" @click="resetPassword()">
                    Reset Password
                  </v-btn>
                </v-flex>
              </v-layout>

            </v-form>
          </v-layout>
        </v-container>
      </v-card-media>

    </v-card>

      <v-snackbar success
        :timeout="snackbarTimeout"
        :top="true"
        :color="'success'"
        v-model="showPasswordChangedSnackbar"
        >
        Password Successfully Changed
      </v-snackbar>

      <v-snackbar error
        :timeout="snackbarTimeout"
        :top="true"
        :color="'error'"
        v-model="showErrorDialog"
        >
        {{errorMessage}}
      </v-snackbar>

  </v-container>

</template>

<script>
import UserService from '../../services/UserService'
import {mapGetters} from 'vuex'
export default
{
  data () {
    return {
      errorMessage: null,
      showErrorDialog: false,
      showPasswordChangedSnackbar: false,
      snackbarTimeout: 4000,
      valid: true,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      changingPassword: false,
      oldPasswordRules: [
        (v) => !!v || 'Required'
      ],
      newPasswordRules: [
        (v) => !!v || 'Required'
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Required'
      ]
    }
  },

  computed: {
    ...mapGetters({
      'userID': 'getUserId'
    })
  },

  methods: {
    /**
    * Reset the user's password
     */
    resetPassword: function () {
      this.$validator.validateAll().then((result) => {
      // Form is being validated

        // Show the loading icon for previewing
        this.changingPassword = true

        // No validation errors
        if (result) {
          // Check to ensure the new password and confirm passwords match
          if (this.newPassword !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match'
            this.showErrorDialog = true
             // Hide the loading icon for previewing
            this.changingPassword = false

            return
          }

          let resettingPassword = UserService.resetPassword(this.userID, this.oldPassword, this.newPassword)

          resettingPassword.then((response) => {
            console.log(response)

            // Show the popup with the success message
            this.showPasswordChangedSnackbar = true

            // Hide the loading icon for changing Password
            this.changingPassword = false

            // Clear the form after changing the password
            this.$refs.form.reset()
          }).catch((error) => {
            console.log(error.response)

            this.errorMessage = error.response.data.status
            this.showErrorDialog = true

            // Hide the loading icon for changing Password
            this.changingPassword = false
          })
        } else {
        // Validation errors occured

          // Used to display the errors to the user
          let formComponents = this.$refs.form.$children
          formComponents.forEach((formComponent) => {
            formComponent.shouldValidate = true
          })

          // Hide the loading icon for changing Password
          this.changingPassword = false

          return
        }
      })
    }
  }
}
</script>

<style>

</style>
