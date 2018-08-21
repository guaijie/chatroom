<template>
  
  <mu-list class="list">

    <mu-sub-header>{{chatType}}</mu-sub-header>

    <li v-for="user in userList" :key="user.id" >
      <mu-list-item button avatar :ripple="true" tag="div" @click="startChat(user._id,user.username)" >
        <mu-list-item-action>
          <mu-avatar>
            <img :src="user.portrait">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{user.username}}</mu-list-item-title>
          <mu-list-item-sub-title>
            {{user.chatRecord}}
          </mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action style="white-space:nowrap">
          <mu-list-item-after-text>{{user.lastTime}}</mu-list-item-after-text>
          <mu-checkbox color="yellow700" value="value1" uncheck-icon="star_border" checked-icon="star"></mu-checkbox>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </li>
  </mu-list>
</template>

<script>
export default{
  name:'sessionCard',
  props:{
    userList:Array,
    chatType:String
  },
  data(){
    return {

    }
  },
  methods:{
    startChat(target,username){

      this.$router.push(`/chat/${target}/${username}`)
    }
  }

}
</script>

<style scope>
  
/* .list{
  width:100vw;
  height:100vh;
} */
.list-item{
  /*height:58px;*/
}
</style>
