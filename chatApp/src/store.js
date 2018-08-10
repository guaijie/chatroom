import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    ws:{},
    chatRecord:{},
    user:'',
    userList:[]
  },
  mutations:{
    wsOpen(state,websocket){
      state.ws=websocket
    },
    wsClose(state,username){
      console.log(state.ws.readyState)
      if(state.ws.readyState&&state.ws.readyState<2){
        state.ws.close(1000,`用户${username}已离线`)
      }
    },
    // 推送消息到聊天记录列表
    chatPush(state,{target,data}){
      if(!state.chatRecord[target]){
        Vue.set(state.chatRecord,target,[])
      }
      state.chatRecord[target].push(data)
      // console.log(state.chatRecord)
    },
    // 记录用户信息
    recordUser(state,user){
      state.user=user
    },
    recordUserList(state,userList){
      state.userList=userList
      console.log(state.userList)
    }
  },
  actions:{
    // 异步打开websocket
    wsOpenAsync(ct,{username,sessionToken}){

      let websocket=new WebSocket(`ws://localhost:3000/chat?username=${username}&sessionToken=${sessionToken}`);
      return new Promise((res)=>{
        websocket.onopen=function(){
          if(this.readyState){
            res(websocket)
          }
        }
      }).then(websocket=>{
          ct.commit('wsOpen',websocket)
          return websocket
      })
    },
    //异步关闭websocket
    wsCloseAsync({state},username){
      return new Promise((res)=>{
        if(state.ws.readyState===undefined||state.ws.readyState===3){
          res()
        }else if(state.ws.readyState<2){
          state.ws.close(1000,`用户${username}已离线`)
          state.ws.onclose=function(){
            res()
          }
        }
      })
    },
    // 异步获取聊天信息
    fetchRecordData(ct){
      ct.state.ws.onmessage=e=>{
        let data=JSON.parse(e.data);
        if(data.type==='private'||data.type==='group'){
          ct.commit('chatPush',{target:data.source,data})
        }
      }
    },
    // 异步推送聊天信息
    pushRecordData(ct,data){
      let ws=ct.state.ws;
      ct.commit('chatPush',{target:data.target,data})
      if(ws.readyState===1){
        data=JSON.stringify(data);
        ws.send(data)
      }else{

      }

    },

    fetchUserList(ct,data){
      let username=ct.state.user;
      Vue.$fetch('api/user/usersList',{username})
      .then(res=>{
        if(res.success){
          let userList=res.userList;
          userList.map(user=>{
            user.lastTime=new Date().toJSON().substr(0,10);
            user.chatRecord=''
          })
          ct.commit('recordUserList',userList)
        }
      })
    }
  }

})


export default store