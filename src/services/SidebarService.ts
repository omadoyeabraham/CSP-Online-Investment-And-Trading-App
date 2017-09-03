/**
 * This service provides the data that is displayed on the sidebar
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */



/**
 * The account types to be shown on the sidebar
 */
export const userAccounts: Array<object> = [
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
    totalValue: '15,000,000',
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
    totalValue: '1,150,000,000',
    model: false,
    children: [
      { icon: 'keyboard_arrow_right', text: 'Running Investments' },
      { icon: 'keyboard_arrow_right', text: 'Terminated Investments' }
    ]
  },
  { icon: 'keyboard', text: 'SMA', totalValue: '1,150,000,000' },
  { icon: 'keyboard', text: 'Structured Inv. Plan', totalValue: '1,150,000,000' },
  { icon: 'keyboard', text: 'Cash Account', totalValue: '1,150,000,000' }
]

/**
 * The account actions that are shown on the sidebar
 */
export const userAccountActions: Array<object> = [
  { icon: 'credit_card', action: 'Fund My Account', link: '/fund-account' },
  { icon: 'perm_identity', action: 'Manage Profile', link: '/manage-profile' },
  { icon: 'lock', action: 'Reset Password', link: '/reset-password' },
  { icon: 'contact_phone', action: 'Contact Manager', link: '/contact-manager' },
]


