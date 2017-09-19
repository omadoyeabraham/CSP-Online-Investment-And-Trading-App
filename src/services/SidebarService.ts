/**
 * This service provides the data that is displayed on the sidebar
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

// The vuex store instance
import store from '../store';


/**
 * The naira Investments to be shown on the sidebar
 */
export const nairaInvestments: Array<object> = [
  {
    icon: 'dns',
    'icon-alt': 'dns',
    heading: 'Stockbroking',
    text: 'Stockbroking',
    totalValue: store.state.user.stockbroking.totalValue,
    model: false,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Portfolio Summary', routeName:'stb-portfolio-summary' },
      { icon: 'keyboard_arrow_right', text: 'Trade', routeName:'/stb/portfolio-summary' },
      { icon: 'keyboard_arrow_right', text: 'Trade History', routeName:'stb-trade-history' },
      { icon: 'keyboard_arrow_right', text: 'Portfolio Holdings', routeName:'stb-portfolio-holdings' },
      { icon: 'keyboard_arrow_right', text: 'Market Data', routeName:'stb-market-data' },
      { icon: 'keyboard_arrow_right', text: 'My Watchlist', routeName:'stb-watchlist' },
      { icon: 'keyboard_arrow_right', text: 'Tools', routeName:'stb-portfolio-summary' }
    ]
  },
  {
    icon: 'contacts',
    'icon-alt': 'contacts',
    text: 'Fixed Income',
    totalValue: store.state.user.fixedIncome.totalValue,
    model: false,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Running Investments' },
      { icon: 'keyboard_arrow_right', text: 'Terminated Investments' }
    ]
  },
  { icon: 'keyboard', text: 'SMA', totalValue: store.state.user.stockbroking.totalValue },
  { icon: 'keyboard', text: 'Cash Account', totalValue: store.state.user.stockbroking.totalValue },
  {icon: 'keyboard', text: 'TOTAL', totalValue: '200,000,000'}
]

/**
 * The Dollar Investments to be shown on the sidebar
 */
export const dollarInvestments: Array<object> = [
  {
    icon: 'contacts',
    'icon-alt': 'contacts',
    text: 'Dollar Investments',
    totalValue: '1,150,000,000',
    model: false,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Running Investments' },
      { icon: 'keyboard_arrow_right', text: 'Terminated Investments' }
    ]
  },
  { icon: 'keyboard', text: 'TOTAL', totalValue: '200,000,000' }
]

/**
 * The account actions that are shown on the sidebar
 */
export const userAccountActions: Array<object> = [
  { icon: 'credit_card', action: 'Fund My Account', link: '/fund-account', new: true },
  { icon: 'perm_identity', action: 'Manage Profile', link: '/manage-profile' },
  { icon: 'lock', action: 'Reset Password', link: '/reset-password' },
  { icon: 'contact_phone', action: 'Contact Manager', link: '/contact-manager' },
]


