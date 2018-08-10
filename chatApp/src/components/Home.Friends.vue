<template>
  
  <SessionList chatType="好友" :chatList="userList" />

</template>

<script>
  import SessionList from './SessionList.vue'
  export default{
    name:'homeFriends',
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
