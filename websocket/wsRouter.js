const express=require('express');
const router=express.Router();
const mongoose= require('mongoose');
const userModel=require('../mongodb/userModel.js');
const app=express();

const online=require('./wsOnline.js');

module.exports=function(server){

  const expressWs=require('express-ws')(app,server);
  const wss=expressWs.getWss();
  wss.on('connection',function(ws,req){
    
    ws.on('open',function(){
      if(ws.readyState===1){
        let data=JSON.stringify({
          msg:`${ws.username}已上线`,
          onlineCounts:wss.clients.size
        });
        broadcast(wss,null,data)
      }
    })
    
  });
  wss.on('error',error=>{
    console.log(error)
  })

  /*连接数据库*/
  router.use('/',function(req,res,next){

    mongoose.connect('mongodb://localhost:27017/test')
    .then(()=>{
      next();
    })
    .catch((err)=>{
      res.status(500)
    })
  })

  /*验证用户是否存在*/
  router.use('/',function(req,res,next){
    let ws=res.req.ws;
    let {sessionToken,username}=req.query;
    if(sessionToken===undefined){
      if(ws.readyState===1){
        let msgObj=JSON.stringify({
          success:false,
          msg:'用户尚未登录，请先登录！'
        })
        res.req.ws.send(msgObj)
      } 
      return 
    }
    userModel.findOne({sessionToken,username})
    .then(doc=>{
      if(doc){
        next()
      }else{
        let ws=res.req.ws;
        if(ws.readyState===1){
          let msgObj=JSON.stringify({
            success:false,
            msg:'用户尚未注册，请先注册！'
          })
          res.req.ws.send(msgObj)
        }      
      }
    })
    .catch(err=>{
      console.log(err)
      res.status(500)
    })

  })

  /*判断是否重复登录*/
  router.use('/',(req,res,next)=>{
    let ws=res.req.ws;
    let clients=wss.clients.values();
    for (client of clients){
      console.log(client.username===req.query.username)
      if(client.username===req.query.username){
        let data=JSON.stringify({
          success:false,
          msg:'您已登录，请勿重新登录！'
        });
        ws.send(data);
        ws.close(1001,'重复登录');

        break
      }
    }
    next()

  })


  router.ws('/',(ws,req)=>{
    ws.username=req.query.username;
    // console.log(ws.readyState,ws._socket)
    ws.emit('open')
    ws.on('message',data=>{
      console.log(data);
      const msgObj=JSON.parse(data)
      if(msgObj.type==='private'){
        privateChat(wss,msgObj.target,data)
      }else if(msgObj.type==='group'){
        groupChat(wss,msgObj.target,data)
      }else if(msgObj.type==='broadcast'){
        broadcast(wss,ws,data)
      }
    })

    ws.on('error',err=>{
      console.log(err)
    })

    ws.on('close',(code,reason)=>{
      let data=JSON.stringify({
        msg:reason,
        onlineCounts:wss.clients.size
      });
      if(code===1000){
        console.log(`${ws.username} closed`)
        broadcast(wss,ws,data)
      }else if(code===1001){
        console.log(reason)
      }

    })

    
  })

  process.stdin.setEncoding('utf8')

  process.stdin.on('data',(data)=>{

    broadcast(wss,null,data)
  })

  app.use('/chat',router);
}




function privateChat(wss,target,data){
  wss.clients.forEach((client)=>{
  if(client.username===target&&client.readyState===1)
    client.send(data)
  })
}

function groupChat(wss,group,data){

  wss.clients.forEach((client)=>{
  if(group.includes(client.username)&&client.readyState===1)
    client.send(data)
  })

}

function broadcast(wss,ws,data){
  wss.clients.forEach((client)=>{
    if(ws!==client&&client.readyState===1){
      client.send(data)
    }
  })

}