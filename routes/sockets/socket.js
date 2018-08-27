const express=require('express');
const router=express.Router();
const mongoose= require('mongoose');
const cookie=require('cookie');
const userModel=require('../../mongodb/userModel.js');

module.exports=function(io,app){

  io.engine.generateId=(req) => {
    let {sessionToken,_id}=req._query;
    return _id
  }


  /*连接数据库*/
  io.use((socket,next)=>{
    mongoose.connect('mongodb://localhost:27017/test')
    .then(()=>{
      return next();
    })
    .catch((err)=>{
      throw err
    })

  })
    

  /*验证用户*/
  io.use(async (socket,next)=>{
    let {sessionToken,_id}=socket.handshake.query;

    if(sessionToken===undefined||_id===undefined){
      return next(new Error(
        JSON.stringify({
          reconnect:false,
          msg:'用户尚未登录，请先登录！'
        })
      ));
      disconnect(socket,500)
    }

    userModel.findOne({sessionToken,_id},{'password':0,registerDate:0})
    .then(doc=>{
      if(doc){
        doc.$set('chatId',socket.id).$set('isOnline',true).save((err)=>{
          if(err) throw err;
          socket.doc=doc.toObject();
          return next()
        });
      }else{
        disconnect(socket,500)
        return next(new Error(
          JSON.stringify({
            reconnect:false,
            msg:'用户尚未注册，请先注册！'
          })
        ))
      }
    })
    .catch(err=>{
      throw err
    })

  })


  io.on('connection',(socket)=>{
    let userInfo=socket.doc;
    io.clients((error,clients)=>{
      if (error) throw error;
      socket.broadcast.emit('broadcast',{
        type:'broadcast',
        userInfo,
        msg:`${userInfo.username}已上线`,
        userOnlineCounts:clients.length
      })
    })


    socket.on('privateChat',(data)=>{

      socket.to(data.target).emit('privateChat',data)
      

    })

    socket.once('disconnect',(reason)=>{
      console.log('disconnect')
      let {sessionToken,_id}=socket.handshake.query;
      userModel.findOne({sessionToken,_id},{password:0,registerDate:0}).
      then(doc=>{
        doc.$set('chatId','').$set('isOnline',false).save(function(err,doc){
          if(err) throw err;
          let {isOnline,username,_id}=doc.toObject();
          io.clients((error,clients)=>{
            if (error) throw error;
            io.emit('broadcast',{
              type:'broadcast',
              userInfo:{isOnline,username,_id},
              msg:`${userInfo.username}已离线`,
              onlineCounts:clients.length
            })
          })

        });
        
      })
      .catch(err=>{
        throw err;
      })

    })

    socket.on('error',(error) => {
      console.log(error)
    });
  })


  // chat.use((socket,next)=>{
  //   let {username}=socket.handshake.query;
  //   socket.id=username;

  // })

  // chat.use((socket,next)=>{
  //   if(ws.readyState===1){
  //     userModel.findOne({username},{_id:0,password:0})
  //     .then(userInfo=>{
  //       if(userInfo){
  //         userInfo.$set('isOnline',true)
  //         let data=JSON.stringify({
  //           type:'broadcast',
  //           userInfo,
  //           msg:`${ws.username}已上线`,
  //           onlineCounts:wss.clients.size
  //         });
  //         broadcast(wss,ws,data);

  //         // userModel.find({username:{$ne:username},isOnline:true},{_id:0,password:0},(err,userInfoList)=>{

  //         // })
  //       }
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     });
  //   }
  // })


}

function disconnect(socket,timeout){
  setTimeout(function(){
    socket.disconnect(true)
  },timeout)

}