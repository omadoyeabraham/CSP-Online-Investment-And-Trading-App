<!--
  Form for contact manager
-->
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

                <!-- Manager Name -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'MANAGER NAME'" v-model="accountManagerName"
                    :type="'text'" class=""
                    disabled>
                  </v-text-field>
                </v-flex>

                <!-- Manager Email -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'MANAGER EMAIL'" v-model="accountManagerEmail"
                    :type="'text'" class=""
                    disabled>
                  </v-text-field>
                </v-flex>

                <!-- Subject -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'SUBJECT'" v-model="subject"
                    :type="'text'" :rules="subjectRules"
                    v-validate="'required'" name="subject">
                  </v-text-field>
                </v-flex>

                <!-- Message -->
                <v-flex xs12 class="height-55px mb6 pl10 pr10" >
                  <v-text-field
                    :label="'MESSAGE'" v-model="message"
                    :type="'textarea'" :rules="messageRules"
                    multi-line
                    v-validate="'required'" name="message">
                  </v-text-field>
                </v-flex>

              </v-layout>

              <!-- Loading Icon when resetting password -->
              <v-layout v-if="sendingEmail"  row class="mt100 d-flex justify-center ">
                <v-flex class="xs6 d-flex justify-center align-center mt20">
                  <!-- <span class="font-size-10">Calculating Order Cost</span> -->
                  <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                  <span class="font-size-12 ml5">Sending Email</span>
                </v-flex>
              </v-layout>

              <!-- Buttons -->
              <v-layout row class="mt100 ml2">
                <v-flex xs6 class="d-flex justify-start">
                  <v-btn style="background: #4c7396; color: #FFFFFF" @click="sendMessage()"
                    :disabled="sendingEmail">
                    Send Message
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
        v-model="showEmailSentSnackbar"
        >
        Your message has been sent to your account manager.
      </v-snackbar>

      <v-snackbar error
        :timeout="snackbarTimeout"
        :top="true"
        :color="'error'"
        v-model="showErrorDialog">
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
      showEmailSentSnackbar: false,
      snackbarTimeout: 4000,
      valid: true,
      subject: null,
      message: null,
      sendingEmail: false,
      subjectRules: [
        (v) => !!v || 'Required'
      ],
      messageRules: [
        (v) => !!v || 'Required'
      ]
    }
  },

  computed: {
    ...mapGetters({
      'accountManagerName': 'getAccountManagerName',
      'accountManagerEmail': 'getAccountManagerEmail',
      'username': 'getUsername'
    })
  },

  methods: {
    /**
    * Reset the user's password
     */
    sendMessage: function () {
      this.$validator.validateAll().then((result) => {
      // Form is being validated

        // Show the loading icon for previewing
        this.sendingEmail = true

        // No validation errors
        if (result) {
          // Send the email out
          let sendingMessage = UserService.contactManager(this.subject, this.message, this.accountManagerEmail, this.username)

          sendingMessage.then((response) => {
            console.log(response)

            // Hide the loading icon for previewing
            this.sendingEmail = false

            // Show the success popup
            this.showEmailSentSnackbar = true

            // Reset the Form
            this.$refs.form.reset()
          }).catch((error) => {
            console.log(error)
            // Hide the loading icon for previewing
            this.sendingEmail = false

            // Set the error popup message
            this.errorMessage = error.message

            // Show the error popup
            this.showErrorDialog = true
          })
        } else {
        // Validation errors occured

          // Used to display the errors to the user
          let formComponents = this.$refs.form.$children
          formComponents.forEach((formComponent) => {
            formComponent.shouldValidate = true
          })

          // Hide the loading icon for changing Password
          this.sendingEmail = false

          return
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
