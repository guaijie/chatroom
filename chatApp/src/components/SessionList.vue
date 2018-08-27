<template>
  
  <mu-list class="list" :dense="true">

    <mu-sub-header>{{chatType}}</mu-sub-header>

    <keep-alive v-for="user in userList" :key="user.id" >
      <mu-list-item button avatar :ripple="true" tag="div" @click="startChat(user._id,user.username)" >
        <mu-list-item-action>
          <mu-avatar>
            <img :src="user.portrait">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{user.username}}</mu-list-item-title>
          <mu-list-item-sub-title>
            {{user.chatMsg}}
          </mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action style="white-space:nowrap">
          <mu-list-item-after-text>{{user.lastTime}}</mu-list-item-after-text>
          <mu-checkbox color="yellow700" value="value1" uncheck-icon="star_border" checked-icon="star"></mu-checkbox>
        </mu-list-item-action>
      </mu-list-item>
    </keep-alive>
  </mu-list>
</template>

<script>
export default{
  name:'sessionCard',
  props:{
    userList:Object,
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
  },
  watch:{
    userList(val){
      return val
    }

  }

}
</script>

<style scope>
  
  .list>li{
    border-bottom:solid 1px rgba(0,0,0,0.12)
  }

</style>
