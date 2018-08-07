<template>
  
  <SessionList chatType="好友" :chatList="chatList" />

</template>

<script>
  import SessionList from './SessionList.vue'
  export default{
    name:'homeFriends',
    data(){
      return{
        chatList:[
          {
            portrait:'http://placehold.it/30x30',
            target:'Join',
            chatRecord:"Wish I could come, but I'm out of town this weekend.",
            lastTime:'2017-05-12'
          },
          {
            portrait:'http://placehold.it/30x30',
            target:'Join',
            chatRecord:"Wish I could come, but I'm out of town this weekend.",
            lastTime:'2017-05-12'
          }
        ]
      }
    },
    components:{SessionList}

  }
</script>

<style>
  

</style>
