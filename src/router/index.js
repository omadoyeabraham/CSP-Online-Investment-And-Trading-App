import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import StbPortfolioSummary from '@/components/stockbroking/PortfolioSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/stb/portfolio-summary',
      name: 'stb-portfolio-summary',
      component: StbPortfolioSummary
    }
  ]
})
