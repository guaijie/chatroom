<template>
  
  <SessionList chatType="群组" :userList="userList" />

</template>

<script>
  import SessionList from './SessionList.vue'
  export default{
    name:'homeGroups',
    data(){
      return{
        userList:[
          
        ]
      }
    },
    components:{SessionList}

  }
</script>

<style>
  

</style>

