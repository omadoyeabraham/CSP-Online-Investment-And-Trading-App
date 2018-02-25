
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
            <!-- action=" https://staging.nibss-plc.com.ng/CentralPayPlus/pay" -->
            <!-- action=" https://centralpay.nibss-plc.com.ng/CentralPayPlus/pay" -->

            <v-form v-model="valid" ref="form" class="w100p"
              id="paymentForm"
              name="cpay"
              method="POST"
              action="https://centralpay.nibss-plc.com.ng/CentralPayPlus/pay">

              <!--Hidden Fields sent to Nibbs -->
              <input type="hidden" name="merchant_id" :value="merchant_id" />
              <input type="hidden" name="product_id" :value="product_id" />
              <input type="hidden" name="product_description" :value="product_description" />
              <input type="hidden" name="customer_id" :value="customer_id" />
              <input type="hidden" name="amount" :value="nibbs_amount" />
              <input type="hidden" name="currency" :value="nibbs_currency" />
              <input type="hidden" name="transaction_id" :value="transaction_id" />
              <input type="hidden" name="response_url" :value="response_url" />
              <input type="hidden" name="hash" :value="hash" />
              <!-- End of Hidden fields -->

              <v-layout row class="pl20 pr20 pt10">

                <!-- Customer Name -->
                <v-flex xs12 class="height-55px mb6">
                  <v-text-field :label="'CUSTOMER NAME'" v-model="username" :type="'text'"  disabled>
                  </v-text-field>
                </v-flex>

                <!-- Username -->
                <v-flex xs6 class="height-55px mb6">
                  <v-text-field :label="'USERNAME'" v-model="portalUsername" :type="'text'"    name="username" disabled>
                  </v-text-field>
                </v-flex>

                <!-- Payment Method -->
                <!-- <v-flex xs6 class="height-55px mb6">
                  <v-select class="" :label="'Payment Method'" :items="paymentMethods" v-model="paymentMethod" v-validate="'required'" :rules="paymentMethodRules" prepend-icon="bookmark" name="paymentMethod" :disabled="inPreviewState">
                  </v-select>
                </v-flex> -->

                <!-- Payment Method -->
                <v-flex xs6 class="height-55px mb6">
                   <v-text-field :label="'PAYMENT METHOD'" v-model="paymentMethod" :type="'text'"    name="paymentMethod" disabled>
                  </v-text-field>
                </v-flex>

                <!-- Cash Account -->
                <v-flex xs12 class="height-55px mb6">
                 <v-select class="" :label="'SELECT A CASH ACCOUNT'" :items="cashAccounts" v-model="cashAccount" v-validate="'required'" :rules="cashAccountRules"  name="paymentMethod" :disabled="inPreviewState">
                  </v-select>
                </v-flex>

                <!-- Currency -->
                <v-flex xs6 class="height-55px mb6">
                  <v-text-field :label="'CURRENCY'" v-model="currency" :type="'text'"   v-validate="'required'" name="currency " :disabled="inPreviewState" disabled>
                  </v-text-field>
                </v-flex>

                <!-- Amount to be shown only when not previwing the form -->
                <!-- v-validate="'required|min_value:50000|max_value:20000000'" -->
                <v-flex xs6 class="height-55px mb6" v-if="!inPreviewState">
                  <v-text-field
                    :label="'AMOUNT'" v-model="clientAmount"
                    :type="'number'" :rules="amountRules"
                     name="amount"
                     v-validate="'required|min_value:50000|max_value:20000000'"
                    :disabled="inPreviewState"
                    min=50000>
                  </v-text-field>
                </v-flex>
                  <!-- <v-flex xs6 class="height-55px mb6" v-if="!inPreviewState">
                  <v-text-field
                    :label="'AMOUNT'" v-model="clientAmount"
                    :type="'number'" :rules="amountRules"
                    name="amount"
                    :disabled="inPreviewState"
                    >
                  </v-text-field>
                </v-flex> -->

              <!-- Customer Amount to be shown only when previewing -->
              <v-flex xs6 v-if="inPreviewState" class="height-55px mb6">
                <v-text-field  :label="'CUSTOMER AMOUNT'" :value="clientAmount | currency('',0)" :type="'text'"   :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

              <!-- Total Charges -->
              <v-flex xs6 v-if="inPreviewState" class="height-55px mb6">
                <v-text-field  :label="'TOTAL CHARGES'" v-model="transactionCharge" :type="'text'"   :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

              <!-- Total Amount -->
              <v-flex xs6 v-if="inPreviewState" class="height-55px mb6">
                <v-text-field  :label="'TOTAL AMOUNT'" :value="totalAmount | currency('',0)" :type="'text'"   :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

              <!-- Transaction Code -->
              <v-flex xs12 v-if="inPreviewState" class="height-55px mb20">
                <v-text-field  :label="'TRANSACTION CODE'" v-model="transaction_id"
                hint="Please take note of your unique transaction id" persistent-hint
                :type="'text'"  :disabled="inPreviewState">
                </v-text-field>
              </v-flex>

              </v-layout>

              <!-- Loading Icon when previewing mandates -->
              <v-layout v-if="gettingTransactionDetails"  row class=" d-flex justify-center ">
                <v-flex class="xs6 d-flex justify-center align-center mt20">
                  <!-- <span class="font-size-10">Calculating Order Cost</span> -->
                  <v-progress-circular indeterminate class="primary--text height-20px width-20px"></v-progress-circular>
                  <span class="font-size-12 ml5">Obtaining transaction details</span>
                </v-flex>
              </v-layout>

              <!-- Buttons -->
              <v-layout v-if="!placingFundRequest" row class="mt20">
                <v-flex xs6 class="d-flex justify-end ">
                  <v-btn v-if="!inPreviewState" style="background: #4c7396; color: #FFFFFF"
                    @click="getPaymentTransactionDetails()">
                    Preview
                  </v-btn>
                  <v-btn v-if="inPreviewState" style="background: #4c7396; color: #FFFFFF" @click="submitPaymentTransaction()">
                    Proceed
                  </v-btn>
                </v-flex>

                <v-flex xs6>
                  <v-btn class="red darken-1 white--text" @click="cancelPaymentTransaction()">
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
import { AccountFundingService } from "../../services/AccountFundingService";
export default {
  props: ["user", "username", "portalUsername", "cashAccounts"],

  $$validates: true,

  data() {
    return {
      valid: false,
      inPreviewState: false,
      gettingTransactionDetails: false,
      placingFundRequest: false,
      paymentMethod: "BANK TRANSFER",
      cashAccount: "",
      currency: "Naira (NGN)",
      clientAmount: "",
      merchant_id: "",
      product_id: "",
      product_description: "",
      customer_id: "",
      nibbs_amount: "",
      nibbs_currency: "",
      transaction_id: "",
      response_url: "",
      hash: "",
      transactionCharge: "",
      totalAmount: "",
      paymentMethods: [
        { text: "Bank Transfer", value: "BANK" },
        { text: "Card Payment", value: "CARD" }
      ],
      paymentMethodRules: [v => !!v || "Required"],
      cashAccountRules: [v => !!v || "Required"],
      amountRules: [
        v => !!v || "Required",
        v => v < 50000 === false || "Minimum of ₦50,000",
        v => v > 20000000 === false || "Maximum of ₦20,000,000"
      ]
    };
  },

  methods: {
    /**
     * Get transaction details icluding the hash, transactionID
     */
    getPaymentTransactionDetails: function() {
      this.$validator.validateAll().then(result => {
        // Form is being validated

        // Validation errors occured
        if (!result) {
          // Used to display the errors to the user, if the preview btn is pressed
          let formComponents = this.$refs.form.$children;

          formComponents.forEach(formComponent => {
            formComponent.shouldValidate = true;
          });

          // Terminate processing because of the errors
          return;
        } else {
          // No validation errors occured

          // Show the loading icon when getting transaction data
          this.gettingTransactionDetails = true;

          // Retrieve details about the user selected cash Account
          let selectedCashAccount = this.cashAccounts.find(cashAccount => {
            return (cashAccount.value = this.cashAccount);
          });

          let paymentTransaction = {
            productId: this.cashAccount,
            productDescription: selectedCashAccount.text,
            amount: this.clientAmount,
            currency: 566,
            clientId: this.user.info.id,
            companyName: selectedCashAccount.companyName
          };

          let paymentTransactionDetails = AccountFundingService.getPaymentTransactionDetails(
            paymentTransaction
          );

          paymentTransactionDetails
            .then(response => {
              let transactionDetails = response.data;

              this.product_id = this.cashAccount;
              this.product_description = paymentTransaction.productDescription;
              this.customer_id = paymentTransaction.clientId;
              this.nibbs_amount = transactionDetails.amountInKobo;
              this.nibbs_currency = 566;
              this.transaction_id = transactionDetails.transactionId;
              this.merchant_id = transactionDetails.merchantId;
              this.response_url = transactionDetails.responseURL;
              this.hash = transactionDetails.hash;
              this.transactionCharge = transactionDetails.charge;

              // because the total amount is returned in kobo
              this.totalAmount =
                parseFloat(transactionDetails.amountInKobo) / 100;

              // Show the loading icon when getting transaction data
              this.gettingTransactionDetails = false;

              // Change the form's state to previewing
              this.inPreviewState = true;

              // Submit the payment form
              // document.getElementById('paymentForm').submit()
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    submitPaymentTransaction: function() {
      // Submit the payment form
      document.getElementById("paymentForm").submit();
    },

    cancelPaymentTransaction: function() {
      // Hide the loading icon when getting transaction data
      this.gettingTransactionDetails = false;

      // Used to display the errors to the user, if the preview btn is pressed
      let formComponents = this.$refs.form.$children;

      formComponents.forEach(formComponent => {
        formComponent.shouldValidate = false;
        formComponent.shouldValidate = false;
      });

      this.inPreviewState = false;
      this.cashAccount = "";
      this.clientAmount = "";
      this.$validator.reset();
    }
  }
};
</script>

<style>

</style>
