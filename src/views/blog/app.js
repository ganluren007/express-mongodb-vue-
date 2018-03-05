import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import store from '../../vuex'

import $ from '../../assets/js/lib/zepto.min.js'
import '../../assets/style/bootstrap.css'

//import '../../assets/js/lib/bootstrap.min.js'
//import sui from '../../assets/js/lib/sm.js'
//import utils from "../../assets/js/common/utils.js";
import  "../../assets/js/lib/h5Sdk.js"
Vue.use(VueRouter)

//console.log(url_config)
//console.log(SKAPP)
import _index from './_index.vue';
import admin from './admin.vue';

const routes = [
    {path: '/index',component: _index,alias: '/',mate:{ keepAlive: true }},
   {path: '/admin',component: admin,mate:{ keepAlive: true }}
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})


