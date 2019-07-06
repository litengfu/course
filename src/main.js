import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateTime from 'vue-date-time-m';
Vue.component('data-time', dateTime);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
