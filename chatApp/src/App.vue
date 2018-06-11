<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <p>{{computeLength}}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      msgList:[1,2,3]
    }
  },
  computed:{
    computeLength(){
      return this.msgList.length
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
