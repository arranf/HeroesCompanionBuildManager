import Vue from 'vue'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'
import store from './store'
import keyStore from './key-store'

Vue.use(BootstrapVue)

/* Other Code */

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$key = keyStore
keyStore.getKey().then(val => { axios.defaults.headers.common['Authorization'] = val })
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
