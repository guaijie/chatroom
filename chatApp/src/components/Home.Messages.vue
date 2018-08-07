<template>
  
  <div>
    <SessionList chatType="私聊"  :chatList="chatList" />
    <SessionList chatType="群聊"  :chatList="chatList" />
  </div>

</template>

<script>
  import SessionList from './SessionList.vue'
  export default{
    name:'homeMessage',
    data(){
      return{
        chatList:[
          {
            portrait:'http://placehold.it/30x30',
            target:'zkw',
            chatRecord:"Wish I could come, but I'm out of town this weekend.",
            lastTime:'2017-05-12'
          },
          {
            portrait:'http://placehold.it/30x30',
            target:'xiong',
            chatRecord:"Wish I could come, but I'm out of town this weekend.",
            lastTime:'2017-05-12'
          },
          {
            portrait:'http://placehold.it/30x30',
            target:'xiaohong',
            chatRecord:"Wish I could come, but I'm out of town this weekend.",
            lastTime:'2017-05-12'
          },
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