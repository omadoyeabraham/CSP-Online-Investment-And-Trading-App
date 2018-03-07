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
                <span class="ml-auto font-weight-normal">
                  {{currency}}
                  <span v-if="cashStatementSummary.openingBalance < 0">
                    ({{Math.abs(cashStatementSummary.openingBalance) | currency('',2)}})
                  </span>
                  <span v-else>
                    {{cashStatementSummary.openingBalance | currency('',2)}}
                  </span>
                </span>
              </li>
              <li class="list-group-item">
                Total Credit
                <span class="ml-auto font-weight-normal">
                  {{currency}}
                  <span v-if="cashStatementSummary.totalCreditAmount < 0">
                    ({{Math.abs(cashStatementSummary.totalCreditAmount) | currency('',2)}})
                  </span>
                  <span v-else>
                    {{cashStatementSummary.totalCreditAmount | currency('',2)}}
                  </span>
                </span>
              </li>
              <li class="list-group-item ">
                Total Debit
                <span class="ml-auto font-weight-normal">
                  {{currency}}
                  <span v-if="cashStatementSummary.totalDebitAmount < 0">
                    ({{Math.abs(cashStatementSummary.totalDebitAmount) | currency('',2)}})
                  </span>
                  <span v-else>
                    {{cashStatementSummary.totalDebitAmount | currency('',2)}}
                  </span>
                </span>
              </li>
              <li class="list-group-item font-weight-bold">
                Closing Balance
                <span class="ml-auto font-weight-normal">
                  {{currency}}
                  <span v-if="cashStatementSummary.closingBalance < 0">
                    ({{Math.abs(cashStatementSummary.closingBalance) | currency('',2)}})
                  </span>
                  <span v-else>
                    {{cashStatementSummary.closingBalance | currency('',2)}}
                  </span>
                </span>
              </li>
              <li class="list-group-item">
                Uncleared Effects
                <span class="ml-auto font-weight-normal">
                  {{currency}}
                  <span v-if="cashStatementSummary.unclearedEffects < 0">
                    ({{Math.abs(cashStatementSummary.unclearedEffects) | currency('',2)}})
                  </span>
                  <span v-else>
                    {{cashStatementSummary.unclearedEffects | currency('',2)}}
                  </span>
                </span>
              </li>
              <li class="list-group-item font-weight-bold">
                Cash Available
                <span class="ml-auto font-weight-normal">
                  {{currency}}
                  <span v-if="cashStatementSummary.cashAvailable < 0">
                    ({{Math.abs(cashStatementSummary.cashAvailable) | currency('',2)}})
                  </span>
                  <span v-else>
                    {{cashStatementSummary.cashAvailable | currency('',2)}}
                  </span>
                </span>
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
              class="table table-striped table-bordered" id="unclearedEffectsTable">
              <thead v-if="unclearedEffects.length" id="unclearedEffectsTableHeader" class="">
                  <th class="font-weight-bold">VALUE DATE</th>
                  <th>DESCRIPTION</th>
                  <th>AMOUNT</th>
              </thead>
              <tbody v-if="unclearedEffects.length" id="unclearedEffectsTableBody">
                <tr
                  v-for="(item, index) in unclearedEffects"
                  :key="index">
                    <td>{{item.valueDate | moment("DD-MMM-YYYY") }} </td>
                    <td>{{item.description}}</td>
                    <td>{{currency}} {{item.unclearedAmount | currency('',2)}}</td>
                </tr>
              </tbody>

              <tbody v-if="!unclearedEffects.length">
                <tr>
                  <td colspan="3" class="text-center">No uncleared effects for this period</td>
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
  #unclearedEffectsTable
    margin-bottom: 0px !important

  #unclearedEffectsTableHeader,
  #unclearedEffectsTableBody
    height: 25px

  #unclearedEffectsTableHeader
    th
      padding: 0px 5px !important
      color: #31708f
      font-weight: bold

  #unclearedEffectsTableBody
    tr
      td
        padding: 5px 5px !important
        height: 25px
        color: #31708f
        font-size: 11px
</style>
