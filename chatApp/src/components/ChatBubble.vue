<template>
  <div :class="['chat-bubble',right?'from-me':'']">
    <div class="chat-content">
      <div class="potrait">
        <img src="http://placehold.it/30x30" alt="头像" width="30" height="30" >
      </div>
      <div class="msg">
        {{msg}}
      </div>
    </div>
  </div>

</template>


<script>
export default {
  name:'chatbubble',
  props:{
    msg:{
      type:String,
      default:''
    },
    right:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {

    }
  },
  mounted(){
  }
}

</script>

<style scoped>
.chat-bubble{
  display:flex;
}
.chat-content{
  display:flex;
  flex-flow:row nowrap;
  width:70%;
  min-height:30px;
  margin-top:20px;
  margin-bottom:20px;
}
.potrait{
  width:30px;
  height:30px;
  margin-right:10px;
  margin-left:5px;
  box-shadow:1px 1px 3px 3px #eee;
  border-radius:50%;
  overflow:hidden;
}
.msg{
  display:flex;
  align-items:center;
  min-width:30px;
  padding:5px;
  border-radius:8px;
  box-shadow:1px 1px 3px 3px #eee;
}
.from-me{
  justify-content:flex-end;
}
.from-me>div{
  flex-direction: row-reverse;
}
.from-me>div>div{
  margin-left:10px;
  margin-right:5px;
}

</style>