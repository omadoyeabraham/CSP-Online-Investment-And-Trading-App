<!--
  The sidebar component displays a summary of the client's portfolio balance, and also serves as a navigation bar for the application

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->

 <template>

    <section class="sidebar h-100">

      <!-- Sidebar heading -->
      <div class="sidebar-header d-flex justify-content-between">
        <span>My Accounts</span>
        <span>
          <i class="fa fa-home" aria-hidden="true"></i>
        </span>
      </div>

      <!-- Sidebar Content -->
      <v-card height="100%" class="grey lighten-4" id="navigation-1" style="z-index: 0">
        <v-navigation-drawer class="grey lighten-4 pb-0 w100p" permanent absolute height="100%" light >
          <v-list dense>
            <template v-for="(item, i) in accountTypes">

              <!-- For nav-items with dropdown children -->
              <v-list-group v-if="item.children" v-model="item.model" no-action>
                <v-list-tile slot="item">
                  <div class="mr10">
                    <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
                  </div>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <span style="float: left">{{ item.text }}</span> <span style="float:right">N{{item.totalValue}}</span>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                  v-for="(child, i) in item.children"
                  :key="i"
                >
                  <v-list-tile-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ child.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              <!-- EOF of nav-items with dropdown -->

              <v-list-tile :key="i" v-else >
                <div class="mr10">
                  <v-icon>{{ item.icon }}</v-icon>
                </div>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span style="float: left">{{ item.text }}</span>
                    <span style="float:right">N{{item.totalValue}}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </template>
          </v-list>
        </v-navigation-drawer>
      </v-card>

    </section>

 </template>

 <script>
    const accountTypes = [
      {
        icon: 'dns',
        'icon-alt': 'dns',
        heading: 'Stockbroking',
        text: 'Stockbroking',
        totalValue: 10000,
        model: false,
        children: [
          { icon: 'keyboard_arrow_right', text: 'Portfolio Summary' },
          { icon: 'keyboard_arrow_right', text: 'Trade' },
          { icon: 'keyboard_arrow_right', text: 'Trade History' },
          { icon: 'keyboard_arrow_right', text: 'Portfolio Holdings' },
          { icon: 'keyboard_arrow_right', text: 'Market Data' },
          { icon: 'keyboard_arrow_right', text: 'My Watchlist' },
          { icon: 'keyboard_arrow_right', text: 'Tools' }
        ]
      },
      {
        icon: 'contacts',
        text: 'Fixed Income',
        totalValue: 50000,
        model: false,
        children: [
          { icon: 'keyboard_arrow_right', text: 'Running Investments' },
          { icon: 'keyboard_arrow_right', text: 'Terminated Investments' }
        ]
      },
      { icon: 'keyboard', text: 'Dollar Investments', totalValue: 10000 },
      { icon: 'keyboard', text: 'SMA', totalValue: 10000 },
      { icon: 'keyboard', text: 'Structured Inv. Plan', totalValue: 10000 },
      { icon: 'keyboard', text: 'Cash Account', totalValue: 130272.41 }
    ]

    export default {
      data () {
        return {
          accountTypes: accountTypes
        }
      }
    }
 </script>

 <style scoped lang="sass">
    .sidebar
      *border: 2px solid #eee
      .sidebar-header
        font-size: 2.5rem
        margin: 5px
        margin-bottom: 0
        border-bottom: 1px solid rgb(204,204,204)
      .sidebar-account
        display: flex
        justify-content: space-between
        padding: 5px 5px
        font-size: 1.3rem
        border-bottom: 1px solid #fff
        color: #333
        &:hover
          background: #EEE
          cursor: pointer
        .fa
          margin-right: 5px
      #expan-panel
        li.expansion-panel__container
          .expansion-panel__header
            .header__icon
              i.icon[style]
                display: none !important
                color: red !important

 </style>

