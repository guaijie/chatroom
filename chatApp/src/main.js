// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'muse-ui/dist/muse-ui.css'
import Vue from 'vue'
import App from './App'
import Router from './router'
import MuseUI from 'muse-ui'
import theme from 'muse-ui/lib/theme'
import {_fetch} from './assets/js/util.js'

Vue.config.productionTip = false
Vue.use(MuseUI);

theme.use('dark')
let router=Router()


_fetch('/users/UserLogin')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
    
  },
  beforeCreate(){

  },
  created(){
  },
  beforeMount(){

  },
  mounted(){

  },
  router,
  components: { App },
  template: '<App/>'
})
