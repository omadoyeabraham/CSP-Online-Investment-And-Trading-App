// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Vuetify is the UI library used to build this application
import Vuetify from 'vuetify'
Vue.use(Vuetify);

// Map components for highcharts
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock';

// Vuelidate is used for from validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Progress bar
import VueProgressBar from 'vue-progressbar'
import VueProgressBarConfig from '../config/vue-progressbar'
Vue.use(VueProgressBar, VueProgressBarConfig)

// Vue-tabs
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
Vue.use(VueTabs)

// Router
import router from './router'

// Expose highcharts to vue
Vue.use(VueHighcharts, { Highcharts })

// Base component that bootstraps the application
import App from './components/App'

// Vuetify CSS
import '../node_modules/vuetify/dist/vuetify.min.css'

// Stylesheet import
import './assets/css/main.scss';

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
  console.log(to)
  if (window.localStorage.length === 0 && to.name !== 'Login') {
    console.log('hereeeee')
    next(false)
    next('/login')
  } else {
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
