<template>
  
  <div>
    <SessionList chatType="私聊"  :userList="userList" />
    <!-- <SessionList chatType="群聊"  :userList="userList" /> -->
  </div>

</template>

<script>
  import SessionList from './SessionList.vue'
  export default{
    name:'homeMessage',
    data(){
      return{
      
      }
    },
    components:{SessionList},
    computed:{
      userList(){
        return this.$store.state.userList
      }
    }

  }
</script>

<style>
  

</style>