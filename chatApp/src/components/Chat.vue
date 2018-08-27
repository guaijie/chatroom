<template>
  <div class="chat">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.push('/home')">
        <mu-icon value="chevron_left" size="30" ></mu-icon>
      </mu-button>
      <div class="title">{{username}}</div>

      <mu-button flat slot="right">
        <mu-icon :value="iconType"></mu-icon>
      </mu-button>
    </mu-appbar>


    <div class="chat-record" ref="chatRecord">

      <keep-alive v-for="(chatObj,index) in chatRecordList" :key="index">
          <ChatBubble :msg="chatObj.chatMsg" :right="chatObj.target===target"></ChatBubble>
      </keep-alive>

    </div>


    <div class="send mu-send-color">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-text-field full-width v-model="message" action-icon="star" @keyup.enter="sendMessage" ></mu-text-field>
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
    },
    username:{
      default:null,
      type:String
    }
  },
  data(){
    return {
      message:'',
      isloading:true,
    }
  },
  components:{
    ChatBubble
  },
  mounted(){
    let chatRecord=this.$refs.chatRecord
    chatRecord.scrollTop=chatRecord.scrollHeight;
    if(!this.socket.connected){
      let sessionToken=this.$cookies.get('sessionToken');
      let _id=this.$cookies.get('_id')
      if(sessionToken&&_id){
        this.$store.dispatch('wsCloseAsync')
        .then(()=>{
          this.$store.dispatch('wsOpenAsync',{_id,sessionToken})
          .then(socket=>{
            if (!socket) return ;
            this.$store.dispatch('onSocket');
            this.$store.dispatch('fetchPrivateChatMsg');
            this.$store.dispatch('fetchBroadcastMsg');
            this.$store.dispatch('fetchGroupChatMsg');
            // this.$store.dispatch('fetchUserList');
          })
        })
      }else{
        this.$router.push('/login');
      }
    }
  },
  methods:{
    sendMessage(){
      let date=new Date();
      let lastTime=date.toTimeString().substr(0,8);
      let chatMsg=this.message;
      let target=this.target;
      let source=this.userInfo._id;
      let recordId=this.recordId;
      let lastDate=date.toLocaleDateString().split('/').join('-');
      let data={
        recordId,
        target,
        chatMsg,
        source,
        lastTime,
        lastDate
      };
      this.$store.commit('addLastMsg',{recordId,lastTime,chatMsg})
      this.$store.dispatch('pushPrivateChatMsg',data)
      this.message='';
    }
  },
  computed:{
    socket(){
      return this.$store.state.socket
    },
    userInfo(){
      return this.$store.state.userInfo
    },
    chatRecordList(){
      return this.$store.state.chatRecords[this.recordId]
    },
    recordId(){
      return [this.target,this.userInfo._id].sort().join('-');
    }
  },
  watch:{
    chatRecordList(){
      let chatRecord=this.$refs.chatRecord
      this.$nextTick(()=>{
        chatRecord.scrollTop=chatRecord.scrollHeight;
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
  position:relative;
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