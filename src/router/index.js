import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import PageNotFound from '@/components/404'
import ChangePassword from '../components/ChangePassword.vue'

// Stockbroking Components
import StbPortfolioSummary from '@/components/stockbroking/portfolio-summary/PortfolioSummary'
import StbTradeHistory from '@/components/stockbroking/trade-history/TradeHistory'
import StbPortfolioHoldings from '@/components/stockbroking/portfolio-holdings/PortfolioHoldings'
import StbMarketData from '@/components/stockbroking/MarketData'
import StbWatchList from '@/components/stockbroking/watchlist/WatchList'
import StbTrade from '@/components/stockbroking/trade/Trade'

// FixedIncome Components
import FixedIncomeRunningInvestments from '@/components/fixedIncome/RunningNairaInvestments'
import FixedIncomeTerminatedInvestments from '@/components/fixedIncome/TerminatedNairaInvestments'
import RunningDollarInvestments from '@/components/fixedIncome/RunningDollarInvestments'
import TerminatedDollarInvestments from '@/components/fixedIncome/TerminatedDollarInvestments'

// Cash Components
import NairaCashAccounts from '@/components/cash/NairaCashAccounts'
import DollarCashAccounts from '@/components/cash/DollarCashAccounts'
// import CashAccountsOverview from '@components/cash/CashAccountsOverview'
import CashAccountsOverview from '../components/cash/CashAccountsOverview.vue'

// SMA
import SmaOverview from '../components/sma/SmaOverview'

// Fund Account
import FundAccount from '@/components/fund-account/FundAccount-404'

// Reset Password
import ResetPassword from '@/components/reset-password/ResetPassword'

// Contact Manager
import ContactManager from '@/components/contact-manager/ContactManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/public',
      redirect: '',
      meta: { requiresAuth: true }
    },
    {
      path: '/login/:resetCode/',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/portfolio-summary',
      name: 'stb-portfolio-summary',
      component: StbPortfolioSummary,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/trade',
      name: 'stb-trade',
      component: StbTrade,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/trade/:orderType/:instrument',
      name: 'stb-trade-redirected',
      component: StbTrade,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/trade-history',
      name: 'stb-trade-history',
      component: StbTradeHistory,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/trade-history?',
      name: 'stb-trade-history-ignore-check',
      component: StbTradeHistory,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/portfolio-holdings',
      name: 'stb-portfolio-holdings',
      component: StbPortfolioHoldings,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/market-data',
      name: 'stb-market-data',
      component: StbMarketData,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/watchlist',
      name: 'stb-watchlist',
      component: StbWatchList,
      meta: { requiresAuth: true }
    },
    {
      path: '/stb/watchlist/:instrument',
      name: 'stb-watchlist-redirected',
      component: StbWatchList,
      meta: { requiresAuth: true }
    },
    {
      path: '/fund-account',
      name: 'fund-account',
      component: FundAccount,
      meta: { requiresAuth: true }
    },
    {
      path: '/fund-account/?s=:responsecode',
      name: 'fund-account-response-from-api',
      component: FundAccount,
      meta: { requiresAuth: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { requiresAuth: true }
    },
    {
      path: '/contact-manager',
      name: 'contact-manager',
      component: ContactManager,
      meta: { requiresAuth: true }
    },
    {
      path: '/sma',
      name: 'sma',
      component: SmaOverview,
      meta: { requiresAuth: true }
    },
    {
      path: '/fi/running',
      name: 'fi-running',
      component: FixedIncomeRunningInvestments,
      meta: { requiresAuth: true }
    },
    {
      path: '/fi/terminated',
      name: 'fi-terminated',
      component: FixedIncomeTerminatedInvestments,
      meta: { requiresAuth: true }
    },
    {
      path: '/di/running',
      name: 'di-running',
      component: RunningDollarInvestments,
      meta: { requiresAuth: true }
    },
    {
      path: '/di/terminated',
      name: 'di-terminated',
      component: TerminatedDollarInvestments,
      meta: { requiresAuth: true }
    },
    {
      path: '/cash',
      name: 'cash-overview',
      component: CashAccountsOverview,
      meta: { requiresAuth: true }
    },
    {
      path: '/cash/naira',
      name: 'cash-naira',
      component: NairaCashAccounts,
      meta: { requiresAuth: true }
    },
    {
      path: '/cash/dollar',
      name: 'cash-dollar',
      component: DollarCashAccounts,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
