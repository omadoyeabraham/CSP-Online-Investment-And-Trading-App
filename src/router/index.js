import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import PageNotFound from '@/components/404'

// Stockbroking Components
import StbPortfolioSummary from '@/components/stockbroking/portfolio-summary/PortfolioSummary'
import StbTradeHistory from '@/components/stockbroking/TradeHistory'
import StbPortfolioHoldings from '@/components/stockbroking/portfolio-holdings/PortfolioHoldings'
import StbMarketData from '@/components/stockbroking/MarketData'
import StbWatchList from '@/components/stockbroking/WatchList'

// FixedIncome Components
import FixedIncomeRunningInvestments from '@/components/fixedIncome/RunningNairaInvestments'
import FixedIncomeTerminatedInvestments from '@/components/fixedIncome/TerminatedNairaInvestments'
import RunningDollarInvestments from '@/components/fixedIncome/RunningDollarInvestments'
import TerminatedDollarInvestments from '@/components/fixedIncome/TerminatedDollarInvestments'

// Cash Components
import NairaCashAccounts from '@/components/cash/NairaCashAccounts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/stb/portfolio-summary',
      name: 'stb-portfolio-summary',
      component: StbPortfolioSummary
    },
    {
      path: '/stb/trade-history',
      name: 'stb-trade-history',
      component: StbTradeHistory
    },
    {
      path: '/stb/portfolio-holdings',
      name: 'stb-portfolio-holdings',
      component: StbPortfolioHoldings
    },
    {
      path: '/stb/market-data',
      name: 'stb-market-data',
      component: StbMarketData
    },
    {
      path: '/stb/watchlist',
      name: 'stb-watchlist',
      component: StbWatchList
    },
    {
      path: '/fi/running',
      name: 'fi-running',
      component: FixedIncomeRunningInvestments
    },
    {
      path: '/fi/terminated',
      name: 'fi-terminated',
      component: FixedIncomeTerminatedInvestments
    },
    {
      path: '/di/running',
      name: 'di-running',
      component: RunningDollarInvestments
    },
    {
      path: '/di/terminated',
      name: 'di-terminated',
      component: TerminatedDollarInvestments
    },
    {
      path: '/cash/naira',
      name: 'cash-naira',
      component: NairaCashAccounts
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
