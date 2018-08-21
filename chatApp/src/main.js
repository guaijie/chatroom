// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-loading/dist/muse-ui-loading.css'

import Vue from 'vue'
import App from './App'
import createRouter from './router'

import MuseUI from 'muse-ui'
import { carbon, createTheme } from 'muse-ui-carbon-theme';
import theme from 'muse-ui/lib/theme'

import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import cookies from 'vue-cookies'

import util from './assets/js/util.js'
import store from './store.js'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(util)
Vue.use(cookies)
Vue.use(Toast);
Vue.use(Loading);

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
let router=createRouter();
let sessionToken=cookies.get('sessionToken');
let _id=cookies.get('_id');

router.beforeEach((to,fr,next)=>{
  if(to.name==='login'||to.name==='signup'){
    next()
  }
  if(store.state.socket.connected){
    next()
  }else{
    if(sessionToken&&_id){
      console.log('beforeEach')
      let userInfo=JSON.parse(localStorage.getItem(_id+'userInfo'));
      if(userInfo){
        store.commit('recordUser',userInfo);
        store.dispatch('wsCloseAsync')
        .then(()=>{
          store.dispatch('wsOpenAsync',{_id,sessionToken})
          .then(socket=>{
            if (!socket) return ;
            store.dispatch('onSocket');
            store.dispatch('fetchPrivateChatMsg');
            store.dispatch('fetchBroadcastMsg');
            store.dispatch('fetchGroupChatMsg');
            store.dispatch('fetchUserList');
          })
        })
      }else{
        router.push('/login');
      }
    }else{
      router.push('/login');
    }

  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  data:{
    
  },
  mounted(){
    let chatRecords=localStorage.getItem(_id+'chatRecords');
    if(!chatRecords ) chatRecords={};
    else{
      try{chatRecords=JSON.parse(localStorage.getItem(_id+'chatRecords'))}
      catch(err){localStorage.removeItem(_id+'chatRecords')}
    }
    
    this.$store.commit('getchatRecords',chatRecords);
  },
  computed:{
    chatRecords(){
      return this.$store.state.chatRecords;
    }
  },
  watch:{
    chatRecords:{
      handler:function(){localStorage.setItem(_id+'chatRecords',JSON.stringify(this.chatRecords))},
      deep:true
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
