import 'es6-promise/auto'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Vuetify is the UI library used to build this application
import Vuetify from 'vuetify'
Vue.use(Vuetify);

// Boostrap JS and Tether JS (for tooltip positioning)
import tether from 'tether'
window.tether = tether
// Vue.use(tether)

// Map components for highcharts
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock';

// Loadash for Vue and normal javascript
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
window._ = require('lodash') // eslint-disable-line no-unused-vars
Vue.use(VueLodash, lodash)

// VueJS Filters
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

// Vuelidate is used for from validation
// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate)

// VeeValidate is used for form validation
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Progress bar
import VueProgressBar from 'vue-progressbar'
import VueProgressBarConfig from '../config/vue-progressbar'
Vue.use(VueProgressBar, VueProgressBarConfig)

// Vue-tabs
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.scss'
Vue.use(VueTabs)

// Vue-moment used for date/time manipulation
import VueMoment from 'vue-moment'
Vue.use(VueMoment)

// Router
import router from './router'

// Expose highcharts to vue
Vue.use(VueHighcharts, { Highcharts })

// Base component that bootstraps the application
import App from './components/App'

// Vuetify CSS
import '../node_modules/vuetify/dist/vuetify.css'

// Stylesheet import
import './assets/css/main.scss';

import axios from 'axios'

// Font awesome
require('font-awesome-sass-loader');

Vue.config.productionTip = false

/**
 * Navigation guard that's called before every route change
 * Used to ensure only authenticated users can access our application
 */
router.beforeEach((to, from, next) => {
  /**
   * If a logged out user is trying to access a "non Login" page, redirect said user to the login * page
   */
  if (window.sessionStorage.length === 0 && (to.name !== 'Login' && to.name !== 'changePassword')) {
    // Stop navigation to the intended route
    next(false)

    // Redirect the user to the login page instead
    next()
    next('/login')
  } else if (window.sessionStorage.length === 0 && to.name === 'Login') {
    // User is trying to logout
    next()
  } else {
    // Add the authorization header to axios if its set in storage
    if (window.sessionStorage.accessToken) {
      // Add authorization header to all future axios requests, until the user logs out
      axios.defaults.headers.common['Authorization'] = window.sessionStorage.accessToken;
    } else {
      // Access token is not set
      // Stop navigation to the intended route
      next(false)
      // Redirect the user to the login page instead
      next('/login')
    }
    // Continue navigation to the intended route
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
