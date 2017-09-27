<!--
  This component controls the summary tab under naira cash accounts

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
-->
<template>
  <v-container fluid grid-list-lg>
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
                <span class="ml-auto font-weight-normal">{{cashStatementSummary.openingBalance}}</span>
              </li>
              <li class="list-group-item">
                Total Credit
                <span class="ml-auto ">{{cashStatementSummary.totalCreditAmount}}</span>
              </li>
              <li class="list-group-item ">
                Total Debit
                <span class="ml-auto font-weight-normal">{{cashStatementSummary.totalDebitAmount}}</span>
              </li>
              <li class="list-group-item font-weight-bold">
                Closing Balance
                <span class="ml-auto font-weight-normal">{{cashStatementSummary.closingBalance}}</span>
              </li>
              <li class="list-group-item">
                Uncleared Effects
                <span class="ml-auto font-weight-normal">{{cashStatementSummary.unclearedEffects}}</span>
              </li>
              <li class="list-group-item font-weight-bold">
                Cash Available
                <span class="ml-auto font-weight-normal">{{cashStatementSummary.cashAvailable}}</span>
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
          <div class="card-block red p0">
            <!-- Uncleared effects -->
            <v-data-table
              v-bind:headers="tableheaders"
              :items="marketData"
              :search="search"
              :loading="loadingDataTable"
              :rows-per-page-items="rowsPerPageItems"
              id="marketDataTable"
              class="table-striped elevation-1 p0">
              <template slot="headers" scope="props">
                <tr class="bg-csp-light-blue " id="marketDataTableHeader">
                  <th v-for="header in props.headers" :key="header.text" :class="['column sortable', 'white--text',
                                          pagination.descending ? 'desc' : 'asc',
                                          header.value === pagination.sortBy ? 'active' : ''
                                          ]" @click="changeSort(header.value)">
                    <!-- <v-icon>arrow_upward</v-icon> -->
                    {{ header.text }}
                  </th>
                </tr>
              </template>

              <template slot="items" scope="props">
                <tr id="marketDataTableBody">
                  <td class="font-size-10">{{props.item.name}}</td>
                  <td class="font-size-10">{{props.item.previousClose}}</td>
                  <td class="font-size-10">{{props.item.openingPrice}}</td>
                  <td class="font-size-10">{{props.item.highPrice}}</td>
                  <td class="font-size-10">{{props.item.lowPrice}}</td>
                  <td class="font-size-10">{{props.item.currentPrice}}</td>
                  <td class="font-size-10">{{props.item.closingPrice}}</td>
                  <td class="font-size-10">{{props.item.priceChange}}</td>
                  <td class="font-size-10">{{props.item.percentChange}}</td>
                  <td class="font-size-10">{{props.item.quantityTraded}}</td>
                  <td class="font-size-10">{{props.item.valueTraded}}</td>
                  <td class="font-size-10">
                    <button class="button button-blue-csp elevation-2 mb2">
                      BUY
                    </button>
                    <button class="button button-blue-csp elevation-2 mb2">
                      SELL
                    </button>
                    <button class="button button-blue-csp elevation-2">
                      WATCH
                    </button>
                  </td>
                </tr>
              </template>
            </v-data-table>

          </div>

        </v-card>
      </v-flex>

    </v-layout>


  </v-container>
</template>

<script>
  export default
  {
    props: ['cashStatements', 'cashStatementSummary', 'unclearedEffects'],

    data () {
      return {
        tableheaders: [
          { text: 'VALUE DATE', value: 'valueDate', align: 'left', sortable: true },
          { text: 'DESCRIPTION', value: 'description', align: 'left' },
          { text: 'AMOUNT(₦)', value: 'amount', align: 'left' }
        ]
      }
    }
  }
</script>

<style>

</style>
