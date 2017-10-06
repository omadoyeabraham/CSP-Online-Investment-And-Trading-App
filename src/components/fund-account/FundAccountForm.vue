<template>

  <v-container fluid class="p0">
    <v-card>

      <v-card-title primary-title class="bg-csp-blue white--text p2 d-flex justify-start">
        <h5 class="headline pl15 mb-0 font-size-12 text-uppercase">......
        </h5>
      </v-card-title>

      <v-card-media>
        <v-container fluid class="pt0 pl1 pr1">
          <v-layout row>
            <v-form v-model="valid" ref="form" class="w100p">
              <v-layout row class="pl20 pr20 pt10">

                <!-- Customer Name -->
                <v-flex xs12 class="height-55px mb6">
                  <v-text-field :label="'Customer Name'" v-model="username" :type="'text'" prepend-icon="add_shopping_cart" :disabled="inPreviewState">
                  </v-text-field>
                </v-flex>

                <!-- Username -->
                <v-flex xs6 class="height-55px mb6">
                  <v-text-field :label="'Username'" v-model="portalUsername" :type="'text'"  prepend-icon="add_shopping_cart"  name="username" readonly>
                  </v-text-field>
                </v-flex>

                <!-- Payment Method -->
                <!-- <v-flex xs6 class="height-55px mb6">
                  <v-select class="" :label="'Payment Method'" :items="paymentMethods" v-model="paymentMethod" v-validate="'required'" :rules="paymentMethodRules" prepend-icon="bookmark" name="paymentMethod" :disabled="inPreviewState">
                  </v-select>
                </v-flex> -->

                <!-- Payment Method -->
                <v-flex xs6 class="height-55px mb6">
                   <v-text-field :label="'Payment Method'" v-model="paymentMethod" :type="'text'"  prepend-icon="add_shopping_cart"  name="paymentMethod" readonly>
                  </v-text-field>
                </v-flex>

                <!-- Cash Account -->
                <v-flex xs12 class="height-55px mb6">
                 <v-select class="" :label="'Select a cash account'" :items="cashAccounts" v-model="cashAccount" v-validate="'required'" :rules="cashAccountRules" prepend-icon="bookmark" name="paymentMethod" :disabled="inPreviewState">
                  </v-select>
                </v-flex>

                <!-- Currency -->
                <v-flex xs6 class="height-55px mb6">
                  <v-text-field :label="'Currency'" v-model="currency" :type="'text'"  prepend-icon="add_shopping_cart" v-validate="'required'" name="currency" :disabled="inPreviewState" readonly>
                  </v-text-field>
                </v-flex>

                <!-- Amount -->
                <v-flex xs6 class="height-55px mb6">
                  <v-text-field :label="'Amount'" v-model="amount" :type="'number'" :rules="amountRules" prepend-icon="add_shopping_cart" v-validate="'required'" name="amount" :disabled="inPreviewState">
                  </v-text-field>
                </v-flex>

              </v-layout>

              <!-- Buttons -->
              <v-layout v-if="!placingFundRequest" row class="mt20">
                <v-flex xs6 class="d-flex justify-end ">
                  <v-btn v-if="!inPreviewState" style="background: #4c7396; color: #FFFFFF"
                    @click="getPaymentTransactionDetails()">
                    Preview
                  </v-btn>
                  <v-btn v-if="inPreviewState" style="background: #4c7396; color: #FFFFFF" @click="placeOrder()">
                    Proceed
                  </v-btn>
                </v-flex>

                <v-flex xs6>
                  <v-btn class="red darken-1 white--text" @click="cancelOrder()">
                    Cancel
                  </v-btn>
                </v-flex>
              </v-layout>

            </v-form>
          </v-layout>
        </v-container>
      </v-card-media>

    </v-card>
  </v-container>

</template>

<script>
import {AccountFundingService} from '../../services/AccountFundingService'
export default
{
  props: [
    'user',
    'username',
    'portalUsername',
    'cashAccounts'
  ],

  data () {
    return {
      valid: false,
      inPreviewState: false,
      gettingTransactionDetails: false,
      placingFundRequest: false,
      paymentMethod: 'BANK TRANSFER',
      cashAccount: '',
      currency: 'Naira (NGN)',
      amount: '',
      paymentMethods: [
        { text: 'Bank Transfer', value: 'BANK' },
        { text: 'Card Payment', value: 'CARD' }
      ],
      paymentMethodRules: [
        (v) => !!v || 'Required'
      ],
      cashAccountRules: [
        (v) => !!v || 'Required'
      ],
      amountRules: [
        (v) => !!v || 'Required',
        (v) => (v < 50000) === false || 'Minimum of ₦50,000',
        (v) => (v > 20000000) === false || 'Maximum of ₦20,000,000'
      ]
    }
  },

  methods: {
    /**
     * Get transaction details icluding the hash, transactionID
     */
    getPaymentTransactionDetails: function () {
      this.$validator.validateAll().then((result) => {
        // Form is being validated

        // Show the loading icon when getting transaction data
        this.gettingTransactionDetails = true

        // Validation errors occured
        if (!result) {
          // Used to display the errors to the user, if the preview btn is pressed
          let formComponents = this.$refs.form.$children

          formComponents.forEach((formComponent) => {
            formComponent.shouldValidate = true
          })
        } else {
          // No validation errors occured

           // Retrieve details about the user selected cash Account
          let selectedCashAccount = this.cashAccounts.find((cashAccount) => {
            return (cashAccount.value = this.cashAccount)
          })

          let paymentTransaction = {
            productId: this.cashAccount,
            productDescription: selectedCashAccount.text,
            amount: this.amount,
            currency: 566,
            clientId: this.user.info.id,
            companyName: selectedCashAccount.companyName
          }

          let paymentTransactionDetails = AccountFundingService.getPaymentTransactionDetails(paymentTransaction)

          paymentTransactionDetails.then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log('There was an errror')
            console.log(error)
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
