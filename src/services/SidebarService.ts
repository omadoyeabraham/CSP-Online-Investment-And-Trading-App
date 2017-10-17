/**
 * This service provides the data that is displayed on the sidebar
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

// The vuex store instance
import store from '../store';

let stbTotalValue = store.state.stockbroking.totalValue

/**
 * The naira Investments to be shown on the sidebar
 */
export const nairaInvestments: Array<object> = [
  {
    icon: 'folder_open',
    'icon-alt': 'folder_open',
    heading: 'Stockbroking',
    text: 'Stockbroking',
    totalValue: stbTotalValue,
    model: false,
    isSTB: true,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Portfolio Summary', routeName:'stb-portfolio-summary' },
      { icon: 'keyboard_arrow_right', text: 'Trade', routeName:'stb-trade' },
      { icon: 'keyboard_arrow_right', text: 'Trade History', routeName:'stb-trade-history' },
      { icon: 'keyboard_arrow_right', text: 'Portfolio Holdings', routeName:'stb-portfolio-holdings' },
      { icon: 'keyboard_arrow_right', text: 'Market Data', routeName:'stb-market-data' },
      { icon: 'keyboard_arrow_right', text: 'My Watchlist', routeName:'stb-watchlist' },
      { icon: 'keyboard_arrow_right', text: 'Investment Tools', routeName:'stb-portfolio-summary' }
    ]
  },
  {
    icon: 'menu',
    'icon-alt': 'menu',
    text: 'Fixed Income',
    totalValue: store.state.fixedIncome.totalValue,
    model: false,
    isFI: true,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Running Investments', routeName: 'fi-running' },
      { icon: 'keyboard_arrow_right', text: 'Terminated Investments', routeName: 'fi-terminated' }
    ]
  },
  {
    icon: 'account_balance',
     text: 'SMA', totalValue: store.state.stockbroking.totalValue,
     routeName: 'sma',
     isSma: true
  },
  {
    icon: 'keyboard',
    text: 'Cash Account',
    totalValue: store.state.stockbroking.totalValue,
    routeName: 'cash-naira',
    isNairaCashBalance: true
  },
  {
    icon: 'keyboard',
    text: 'TOTAL',
    totalValue: '200,000,000',
    isTotalForNairaInvestments: true
  }
]

/**
 * The Dollar Investments to be shown on the sidebar
 */
export const dollarInvestments: Array<object> = [
  {
    icon: 'attach_money',
    'icon-alt': 'attach_money',
    text: 'Dollar Investments',
    totalValue: '1,150,000,000',
    model: false,
    isDollarInvestments: true,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Running Investments', routeName: 'di-running' },
      { icon: 'keyboard_arrow_right', text: 'Terminated Investments', routeName: 'di-terminated' }
    ]
  },
  {
    icon: 'keyboard',
    text: 'Cash Account',
    totalValue: store.state.stockbroking.totalValue,
    routeName: 'cash-dollar',
    isDollarCashBalance: true
  },
  {
    icon: 'keyboard',
    text: 'TOTAL',
    isTotalForDollarInvestments: true,
    totalValue: '$200,000,000'
  }
]

/**
 * The account actions that are shown on the sidebar
 */
export const userAccountActions: Array<object> = [
  {
    icon: 'credit_card',
    action: 'Fund My Account',
    link: '/fund-account',
    routeName: 'fund-account',
    new: true
  },
  { icon: 'perm_identity', action: 'Manage Profile', link: '/manage-profile' },
  { icon: 'lock', action: 'Reset Password', link: '/reset-password' },
  { icon: 'contact_phone', action: 'Contact Manager', link: '/contact-manager' },
]


