// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Vuetify is the UI library used to build this application
// import Vuetify from 'vuetify'

// Map components for highcharts
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock';

// Base component that bootstraps the application
import App from './components/App'

// Router
import router from './router'

// Expose the UI library to Vue
// Vue.use(Vuetify);

// Expose highcharts to vue
Vue.use(VueHighcharts, { Highcharts })

// Vuetify CSS
import '../node_modules/vuetify/dist/vuetify.min.css'

// Stylesheet import
import './assets/css/main.scss';

// Font awesome
require('font-awesome-sass-loader');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
