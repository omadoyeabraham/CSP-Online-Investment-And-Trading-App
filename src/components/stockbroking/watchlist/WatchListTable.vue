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
                  @click.native.stop="showUpdateWatchListDialog = true">
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
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <div class="headline">Use Google's location service?</div>
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="showUpdateWatchListDialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="showUpdateWatchListDialog = false">Agree</v-btn>
        </v-card-actions>
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
      showUpdateWatchListDialog: false,
      showSuccessWatchListSnackbar: false,
      showWatchlistSnackbar: false,
      watchlistSnackbarText: null,
      snackbarTimeout: 3000,
      snackbarMode: '',
      watchlistSnackbarColor: 'red lighten-2'
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
