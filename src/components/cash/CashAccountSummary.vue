<!--
  This component controls the summary tab under naira cash accounts

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid grid-list-lg class="p0">
    <v-layout row>

      <!-- Statement summary -->
      <v-flex sm4>
        <v-card class="white lighten-2 card h-100" dark>

          <div class="w100p bg-csp-light-blue p10">
            <div class="text-uppercase">STATEMENTS SUMMARY</div>
          </div>

          <!-- Card body -->
          <div class="card-block">
            <ul class="list-group list-group-flush black--text">
              <li class="list-group-item font-weight-bold">
                Opening Balance
                <span class="ml-auto font-weight-normal">{{currency}}
                  {{cashStatementSummary.openingBalance}}</span>
              </li>
              <li class="list-group-item">
                Total Credit
                <span class="ml-auto ">{{currency}} {{cashStatementSummary.totalCreditAmount}}</span>
              </li>
              <li class="list-group-item ">
                Total Debit
                <span class="ml-auto font-weight-normal">
                  {{currency}} {{cashStatementSummary.totalDebitAmount}}</span>
              </li>
              <li class="list-group-item font-weight-bold">
                Closing Balance
                <span class="ml-auto font-weight-normal">{{currency}}
                  {{cashStatementSummary.closingBalance}}</span>
              </li>
              <li class="list-group-item">
                Uncleared Effects
                <span class="ml-auto font-weight-normal">{{currency}}
                  {{cashStatementSummary.unclearedEffects}}</span>
              </li>
              <li class="list-group-item font-weight-bold">
                Cash Available
                <span class="ml-auto font-weight-normal">{{currency}}
                  {{cashStatementSummary.cashAvailable}}</span>
              </li>
            </ul>
          </div>

        </v-card>
      </v-flex>

      <!-- Uncleared Effects -->
      <v-flex sm8>
        <v-card class="white lighten-2 card h-100" dark>

          <div class="w100p bg-csp-light-blue p10">
            <div class="text-uppercase">UNCLEARED EFFECTS</div>
          </div>

          <!-- Card body -->
          <div class="card-block p0">
            <!-- Uncleared effects -->
            <table
              v-if="unclearedEffects"
              class="table table-striped">
              <thead>
                <tr>
                  <th class="font-weight-bold">VALUE DATE</th>
                  <th>DESCRIPTION</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in unclearedEffects"
                  :key="index">
                    <td>{{item.valueDate | moment("DD-MMM-YYYY") }} </td>
                    <td>{{item.description}}</td>
                    <td>{{currency}} {{item.unclearedAmount}}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </v-card>
      </v-flex>

    </v-layout>


  </v-container>
</template>

<script>
  export default
  {
    props: ['cashStatements', 'cashStatementSummary', 'unclearedEffects', 'currency'],

    data () {
      return {
        show: true,
        search: '',
        loadingDataTable: false,
        rowsPerPageItems: [15, 20, { text: 'All', value: -1 }],
        pagination: {
          sortBy: 'name'
        },
        tableheaders: [
          { text: 'VALUE DATE', value: 'valueDate', align: 'left', sortable: true },
          { text: 'DESCRIPTION', value: 'description', align: 'left' },
          { text: 'AMOUNT(₦)', value: 'amount', align: 'left' }
        ]
      }
    }
  }
</script>

<style scoped lang="sass">
  #marketDataTable
    margin-bottom: 0px !important

  #marketDataTableHeader,
  #marketDataTableBody
    height: 25px

  #marketDataTableHeader
    th
      padding: 0px 5px !important

  #marketDataTableBody
    td
      padding: 5px 5px !important
      height: 25px
  .btn__content
    padding: 0px !important
</style>
