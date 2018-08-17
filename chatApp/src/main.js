// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createRouter from './router'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import { carbon, createTheme } from 'muse-ui-carbon-theme';
import theme from 'muse-ui/lib/theme'

import Toast from 'muse-ui-toast';
import cookies from 'vue-cookies'

import util from './assets/js/util.js'
import store from './store.js'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(util)
Vue.use(cookies)
Vue.use(Toast);

theme.add('romantic', {
  primary: '#ec407a',
  secondary: '#f06292',
  success: '#4caf50',
  warning: '#ffeb3b',
  background: {
    paper: '#fff',
    chip: '#f8bbd0'
  } 
},'light')

theme.addCreateTheme((theme) => {
  return `
  .mu-paper-background {
    background-color: ${theme.background.paper}
  }
  .mu-actived-color{
    background-color: ${theme.primary};
    opacity:0.75;
    color:white !important;
  }
  .mu-actived-text-color{
    background-color:white;
    color:${theme.primary} !important;
  }
  .mu-appbar-title{
    line-height:normal;
  }
  .mu-appbar{
    width:100%;
    height:50px;
  }
  `;
});

theme.add('carbon', carbon)
  .addCreateTheme(createTheme)
  .use('carbon');

// theme.use('dark')
let router=createRouter()


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
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
