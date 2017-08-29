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

      <!-- Sidebar Accounts  Content -->
      <v-card height="100%" class="grey lighten-4" id="navigation-1"  style="z-index: 0">
        <v-navigation-drawer class="grey lighten-4 pb-0 w100p" permanent absolute height="100%" light >
          <!-- Client Accounts -->
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

          <!-- Account Actions -->
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
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </template>
          </v-list>

        </v-navigation-drawer>
      </v-card>

      <!-- Bottom navigation on sidebar -->
      <v-card height="auto" >
        <v-bottom-nav absolute value="true" class="transparent">
          <v-btn flat light class="teal--text" @click.native="e1 = 1" :value="e1 === 1">
            <span>Accounts</span>
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn flat light class="teal--text" @click.native="e1 = 2" :value="e1 === 2">
            <span>Market</span>
            <v-icon>view_comfy</v-icon>
          </v-btn>
          <v-btn flat light class="teal--text" @click.native="e1 = 3" :value="e1 === 3">
            <span>Contact Us</span>
            <v-icon>record_voice_over</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>

    </section>

 </template>

 <script>
    // List of the account types to be displayed on the sidebar
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
        'icon-alt': 'contacts',
        text: 'Fixed Income',
        totalValue: 50000,
        model: false,
        children: [
          { icon: 'keyboard_arrow_right', text: 'Running Investments' },
          { icon: 'keyboard_arrow_right', text: 'Terminated Investments' }
        ]
      },
      {
        icon: 'contacts',
        'icon-alt': 'contacts',
        text: 'Dollar Investments',
        totalValue: 50000,
        model: false,
        children: [
          { icon: 'keyboard_arrow_right', text: 'Running Investments' },
          { icon: 'keyboard_arrow_right', text: 'Terminated Investments' }
        ]
      },
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
      .sidebar-header
        font-size: 2.5rem
        margin: 5px
        margin-bottom: 0
        border-bottom: 1px solid rgb(204,204,204)
 </style>

