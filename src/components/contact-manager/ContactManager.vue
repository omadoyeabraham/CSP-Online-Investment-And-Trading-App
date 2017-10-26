<!--
  Contact Manager Component
-->
<template>
    <v-container fluid>

    <!-- HEADER -->
    <v-layout row>
      <v-flex class="font-size-20 csp-light-blue-text">Contact Account Manager</v-flex>
    </v-layout> <hr>

    <!-- Form and Privacy Content -->
    <v-layout row>

      <!-- Fund Account Form -->
      <v-flex xs4>
        <contact-manager-form>
        </contact-manager-form>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
import ContactManagerForm from './ContactManagerForm'
export default {
  components: {
    ContactManagerForm
  }
}
</script>

<style scoped>

</style>
