// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
    msgList:[1,2,3]
  },
  beforeCreate(){
    console.log(1,this.$el,this.msgList,this.computeLength)

  },
  created(){
    console.log(2,this.$el,this.msgList,this.computeLength)
  },
  beforeMount(){
    console.log(3,this.$el,this.msgList,this.computeLength)
  },
  mounted(){
    console.log(4,this)
  },
  computed:{
    computeLength(){
      return this.msgList.length
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
