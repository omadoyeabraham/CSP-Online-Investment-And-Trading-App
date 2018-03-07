<template>
  <v-card class="grey lighten-3">
  <v-card-title class="bg-csp-blue white--text height-35px p2 d-flex font-size-15 pl10">
    Password Security Tips
  </v-card-title>

  <v-card-text class="p5">
    <!-- <table class="table table-stripedd grey lighten-3 mb0" id="passwordPolicyTable">
      <tbody>
        <tr class="pt1 pb1">
          <td>
            All passwords should be reasonably complex and difficult for unauthorized people to guess. Choose passwords that contain a combination of upper- and lower-case letters, numbers, and punctuation marks and other special characters
          </td>
        </tr>
        <tr class="pt1 pb1">
          <td >
            Avoid basic combinations that are easy to crack. For instance, choices like “password,” “password1” and “Pa$$w0rd” are equally bad from a security perspective.
          </td>
        </tr>
        <tr class="pt1 pb1">
          <td >
            Always take steps to avoid phishing scams and other attempts by hackers to steal passwords and other sensitive information.
          </td>
        </tr>
        <tr class="pt1 pb1">
          <td >
             Do not use the same password for all accounts such as additional email accounts or other accounts you may have on the internet.
          </td>
        </tr>
      </tbody>
    </table> -->
    <ul id="policyList" class="font-size-14">
      <li>
        All passwords should be reasonably complex and difficult for unauthorized people to guess. Choose passwords that contain a combination of upper and lower-case letters, numbers, and punctuation marks and other special characters.
      </li>
      <li>
        Avoid basic combinations that are easy to crack. For instance, choices like “password,” “password1” and “Pa$$w0rd” are insecure password choices.
      </li>
      <li>
        Always take steps to avoid phishing scams and other attempts by hackers to steal passwords and other sensitive information.
      </li>
      <li>
        Do not use the same password for all accounts such as additional email accounts or other accounts you may have on the internet.
      </li>
    </ul>
  </v-card-text>

</v-card>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
  #passwordPolicyTable
    tbody
      tr
        td
          display: list-item
          padding-bottom: 60px
          list-style-type: disc
          list-style-position: inside
          font-weight: 500

  #policyList
    li
      padding-bottom: 10px
      font-weight: 500
</style>


