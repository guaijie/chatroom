<template>
  <div class="chat">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.push('/home')">
        <mu-icon value="chevron_left" size="30" ></mu-icon>
      </mu-button>
      <div class="title">{{target}}</div>

      <mu-button flat slot="right">
        <mu-icon :value="iconType"></mu-icon>
      </mu-button>
    </mu-appbar>


    <div class="chat-record" ref="chatRecord">

      <keep-alive v-for="(chatObj,index) in chatrecords" :key="index">
          <ChatBubble :msg="chatObj.msg" :right="chatObj.target===target"></ChatBubble>
      </keep-alive>

    </div>


    <div class="send mu-send-color">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-text-field full-width v-model="message" action-icon="star"></mu-text-field>
        <mu-button flat slot="right" @click="sendMessage">
          <mu-icon value="send"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>

  </div>

</template>


<script>
import ChatBubble from './ChatBubble.vue'

export default {
  name:'chat',
  props:{
    iconType:{
      default:'person',
      type:String
    },
    target:{
      default:null,
      type:String
    }
  },
  data(){
    return {
      message:'',
    }
  },
  components:{
    ChatBubble
  },
  mounted(){
     
  },
  methods:{
    sendMessage(){
      let data={
        type:'private',
        target:this.target,
        msg:this.message,
        source:this.user
      };
      this.$store.dispatch('pushRecordData',data)
    }
  },
  computed:{
    ws(){
      return this.$store.state.ws
    },
    user(){
      return this.$store.state.user
    },
    chatrecords(){
      return this.$store.state.chatRecords[this.target]
    }
  },
  watch:{
    chatrecords(){
      this.$nextTick(()=>{
        let chatRecord=this.$refs.chatRecord
        chatRecord.scrollTop=chatRecord.scrollHeight

      })
    }
  }

}


</script>

<style scoped>
.chat{
  width:100vw;
  height:100vh;
  overflow:hidden;
}
.title{
  text-align:center;
}
.send{
  position:fixed;
  width:100%;
  left:0;
  bottom:0;
}
.mu-input{
  min-height:0;
  margin:0;
  padding:0;
}

.chat-record{
  height:calc(100vh - 100px);
  overflow-y:auto;
}
.bubble{
  display:flex;
}
.from-me{
  justify-content:flex-end;
}
.chat-content{
  display:flex;
  flex-flow:row nowrap;
  width:70%;
  min-height:30px;
  margin-top:20px;
  margin-bottom:20px;
}
.your-content{
  padding-left:10px;
}
.my-content{
  padding-right:10px;
  justify-content:flex-end;
}
.potrait{
  width:30px;
  height:30px;
  box-shadow:1px 1px 3px 3px #eee;
  border-radius:50%;
  overflow:hidden;
}
.your-potrait{
  margin-right:10px;
}
.my-portrait{
  margin-left:10px;
}
.msg{
  display:flex;
  align-items:center;
  min-width:30px;
  padding:5px;
  border-radius:8px;
  box-shadow:1px 1px 3px 3px #eee;
}

</style>