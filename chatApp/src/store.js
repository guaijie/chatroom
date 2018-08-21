import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    socket:{},
    chatRecords:{},
    userInfo:{},
    userList:[]
  },
  mutations:{
    wsOpen(state,socket){
      state.socket=socket
    },
    // 推送消息到聊天记录列表
    chatPush(state,{recordId,data}){
      if(!state.chatRecords[recordId]){
        Vue.set(state.chatRecords,recordId,[])
      }
      state.chatRecords[recordId].push(data)
      // console.log(state.chatRecords)
    },
    // 记录用户信息
    recordUser(state,userInfo){
      state.userInfo=userInfo
    },
    /*记录用户信息列表*/
    recordUserList(state,userList){
      state.userList=userList
    },
    /*获取本地聊天记录*/
    getchatRecords(state,chatRecords){
      state.chatRecords=chatRecords;
    }
  },
  actions:{
    // 异步打开socket
    wsOpenAsync(ct,{_id,sessionToken}){
      let socket = io('http://192.168.1.28:3000',{
        path:'/chat',
        transports: ["websocket", "polling"],
        query:{
          sessionToken:`${sessionToken}`,
          _id:`${_id}`
        }
      });
      return new Promise((res)=>{
        socket.on('connect',()=>{
          if(socket.connected){
            res(socket)
          }else{
            res()
          }
        })
      }).then(socket=>{
        if(socket){
          ct.commit('wsOpen',socket);
          return socket
        }else{
          throw Error('连接失败！')
        }
        
      }).catch(err=>{
        Vue.$toast.message({
          message:err,
          position:'top'
        })
      })

    },

    onSocket({state},username){
      state.socket.on('error',function(err){
        state.socket.close()
      });

      state.socket.on('reconnect', (attemptNumber)=>{ 
        console.log('第'+attemptNumber+'次重新连接后连接成功')
        
      });

      state.socket.on('reconnecting', (attemptNumber)=>{ 
        console.log('正在第'+attemptNumber+'次重新连接')
        if(attemptNumber>=3){
          state.socket.close()
        }
      });

      state.socket.on('reconnect_error', (err) => {
        console.log(err)
      });

      state.socket.on('reconnect_failed', () => {
        console.log('reconnect_failed')
      }); 

    },
    //异步关闭socket
    wsCloseAsync({state}){
      return new Promise((res)=>{
        if(state.socket.connected===undefined||state.socket.connected===false){
          res()
        }else if(state.socket.connected){
          state.socket.close()
          res()
        }
      })
    },
    // 异步获取私聊信息
    fetchPrivateChatMsg(ct){
      ct.state.socket.on('privateChat',(data)=>{
        let recordId=data.recordId;
        ct.commit('chatPush',{recordId,data})
      })
    },
    // 异步获取广播信息
    fetchBroadcastMsg(ct){
      ct.state.socket.on('broadcast',(data)=>{
        console.log(data)
      })
    },
    // 异步获取群聊信息
    fetchGroupChatMsg(ct){
      ct.state.socket.on('groupChat',(data)=>{
        let recordId=data.recordId;
        ct.commit('chatPush',{recordId,data})
      })
    },
    // 异步推送私聊信息
    pushPrivateChatMsg(ct,data){
      let socket=ct.state.socket;
      let recordId=data.recordId;
      ct.commit('chatPush',{recordId,data})
      if(socket.connected){
        socket.emit('privateChat',data)
      }else{

      }
    },
    // 异步推送群聊信息
    pushGroupChatMsg(ct,data){
      let socket=ct.state.socket;
      let recordId=data.recordId;
      ct.commit('chatPush',{recordId,data})
      if(socket.connected){
        socket.emit('groupChat',data)
      }else{

      }

    },
    fetchUserList(ct){
      let _id=ct.state.userInfo._id;
      Vue.$fetch('/api/user/usersList',{_id})
      .then(res=>{
        if(res.success){
          let userList=res.userList;
          ct.commit('recordUserList',userList)
        }
      })
    }
  }

})


export default store