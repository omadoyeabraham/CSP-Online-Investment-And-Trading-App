<!--
  Displays the table showing all of a user's watchLists
-->
<template>
  <v-container fluid class="p0">
    <v-layout row>
      <v-flex xs12>
        <table class="table table-striped table-bordered elevation-1" id="watchListTable">
          <thead class="bg-csp-light-blue white--text">
            <th>STOCK</th>
            <th>CONDITION</th>
            <th>CUR PRICE (&#8358;)</th>
            <th>% CHANGE</th>
            <th>ALERT</th>
            <th></th>
          </thead>

          <!-- User has watchlist -->
          <tbody v-if="userWatchList">
            <tr
              v-for="(item, index) in userWatchList"
              :key="index">
              <td>{{item.name}}</td>
              <td>{{item.condition}} {{item.notify_price}}</td>
              <td>{{item.currentPrice}}</td>
              <td>{{item.priceChange | currency('',2)}}</td>
              <td>
                 <button v-if="item.status === '0'"
                    class="button button-blue-csp elevation-2 mb2"
                    @click="toggleWatchList(item.status, item.user_id, item.id)"
                   >
                    ENABLE
                  </button>
                  <button v-else
                    class="button button-blue-csp elevation-2 mb2"
                    @click="toggleWatchList(item.status, item.user_id, item.id)"
                   >
                    DISABLE
                  </button>
              </td>
              <td class="text-center">
                <!-- Edit icon -->
                <v-icon class="blue--text delete-btn"
                  @click="showUpdateWatchListForm(item, $event)">
                  edit
                </v-icon>
                <!-- Delete -->
                <v-icon class="red--text delete-btn"
                  @click="deleteWatchList(item.id, item.user_id)">
                  delete
                </v-icon>
              </td>
            </tr>
          </tbody>

          <!-- User has no watchlist items -->
          <tbody v-if="!userWatchList">
            <tr>
              <td colspan="5" class="text-center">No Watchlist items</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>

    <v-snackbar error
      :timeout="snackbarTimeout"
      :top="true"
      :multi-line="snackbarMode === 'multi-line'"
      :vertical="snackbarMode === 'vertical'"
      :color="'success'"
      v-model="showWatchlistSnackbar"
      >
      {{ watchlistSnackbarText }}
    </v-snackbar>

    <v-snackbar success
      :timeout="snackbarTimeout"
      :top="true"
      :multi-line="snackbarMode === 'multi-line'"
      :vertical="snackbarMode === 'vertical'"
      :color="'success'"
      v-model="showSuccessWatchListSnackbar"
      >
      {{ watchlistSnackbarText }}
    </v-snackbar>

    <!-- Dialog for updating watchlists -->

    <v-dialog v-model="showUpdateWatchListDialog" lazy absolute>
      <v-btn id="openUpdateWatchListDialog"
        style="display: none" color="primary" dark slot="activator"></v-btn>
      <v-card>
        <v-card-title class="d-flex justify-center bg-csp-light-blue p5 pt10">
          <h5 class="white--text font-size-20px">UPDATE WATCHLIST</h5>
        </v-card-title>
        <!-- Form -->
        <v-card-text>
          <v-form v-model="valid" ref="form" class="w100p pl5">

            <!-- Stock -->
            <v-flex xs12 class="height-55px mb6">
             <v-text-field
              :label="'Stock'"x
              v-model="selectedWatchList.name"
              :type="'text'"
              name="Name"
              disabled>
             </v-text-field>
            </v-flex>

            <!-- Condition -->
            <v-flex xs12 class="height-55px mb6">
              <v-select class="" :label="'Condition'" :items="conditions" v-model="selectedWatchList.condition" v-validate="'required'" :rules="conditionRules"  name="condition" >
              </v-select>
            </v-flex>

            <!-- Price -->
            <v-flex xs12  class="height-55px mb6">
              <v-text-field  :label="'Price'" v-model="selectedWatchList.notify_price" :rules="priceRules" :type="'number'"  v-validate="'required'" name="price" >
              </v-text-field>
            </v-flex>

            <!-- Buttons -->
            <v-container fluid class="p0 ">
              <v-layout  row class="mt20">
                <v-flex xs6 class="d-flex justify-end ">
                  <v-btn small style="background: #4c7396; color: #FFFFFF"
                    @click="updateWatchList()">
                    UPDATE
                  </v-btn>
                </v-flex>

                <v-flex xs6>
                  <v-btn small class="red darken-1 white--text"
                    @click="cancelWatchListUpdateForm">
                    CANCEL
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>

          </v-form>
        </v-card-text>

      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import WatchListService from '../../../services/WatchListService'

export default
{
  props: ['userWatchList'],

  data () {
    return {
      valid: false,
      selectedWatchList: {},
      showUpdateWatchListDialog: false,
      showSuccessWatchListSnackbar: false,
      showWatchlistSnackbar: false,
      watchlistSnackbarText: null,
      snackbarTimeout: 3000,
      snackbarMode: '',
      watchlistSnackbarColor: 'red lighten-2',
      conditions: [
        { text: 'LESS THAN OR EQUAL TO', value: '<=' },
        { text: 'GREATER THAN OR EQUAL TO', value: '>=' }
      ],
      conditionRules: [
        (v) => !!v || 'Required'
      ],
      priceRules: [
        (v) => !!v || 'Required'
      ]
    }
  },

  methods: {
    // Delete a user's watchlist item
    deleteWatchList: function (watchListId, userId) {
      let deletingWatchList = WatchListService.deleteWatchList(watchListId, userId)

      deletingWatchList.then((response) => {
        // Refresh the watchlist data to reflect the now deleted watchlist
        this.$parent.retreiveUpdatedWatchListData()

        this.watchlistSnackbarText = 'Watchlist successfully deleted'
        this.showWatchlistSnackbar = true
      }).catch((error) => {
        console.log(error)
      })
    },

    // Toggle the status of a user's watchlist
    toggleWatchList: function (watchListStatus, customerId, watchListId) {
      let togglingWatchList = WatchListService.toggleWatchList(watchListStatus, customerId, watchListId)

      togglingWatchList.then((response) => {
        console.log(response)
        // Refresh the watchlist data to reflect the now deleted watchlist
        this.$parent.retreiveUpdatedWatchListData()

        this.watchlistSnackbarText = 'Watchlist status successfully updated'
        this.showSuccessWatchListSnackbar = true
      }).catch((error) => {
        console.log(error)
      })
    },

    // Show the form for updating a watchlist
    showUpdateWatchListForm: function (watchList, event) {
      // Set the selected watchlist so the popup dialog can be populated with the selected watchlist
      this.selectedWatchList = watchList
      console.log(this.selectedWatchList)

      // Display the edit popup modal/dialog
      document.querySelector('#openUpdateWatchListDialog').click()

      /**
       * Stopping the event propagation because of the auto-close quirk that vuetify's dialog
       * popup has if the click event is not triggered from within the activator slot of the
       * dialog component
       */
      event.stopPropagation()
    },

    // Close and clear the form for updating watchlists
    cancelWatchListUpdateForm: function () {
      // Close the dialog modal
      this.showUpdateWatchListDialog = false

      // Clear the selected watchlist
      this.selectedWatchList = {}
    },

    // Update a watchlist item
    updateWatchList: function () {
      let updatingWatchList = WatchListService.updateWatchList(this.selectedWatchList)

      updatingWatchList.then((response) => {
        // Refresh the watchlist data to reflect the now deleted watchlist
        this.$parent.retreiveUpdatedWatchListData()

        this.watchlistSnackbarText = 'Watchlist successfully updated'
        this.showWatchlistSnackbar = true

        // Close and clear the update popup upon successful updating
        this.cancelWatchListUpdateForm()
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="sass">
  #watchListTable
    thead
      th
        font-size: 11px
        color: #FFFFFF

    tbody
      tr
        td
          font-size: 11px

    .delete-btn
      &:hover
        cursor: pointer

</style>
