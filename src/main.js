import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import "./assets/css/base.css"
import 'element-ui/lib/theme-chalk/index.css';

import { request } from "./network/request";

Vue.prototype.$request = request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
