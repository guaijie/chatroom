const express = require('express');
const mongoose= require('mongoose');
const userModel=require('../mongodb/userModel.js');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');

mongoose.connection.on('open',()=>{
  console.log('db is connected')
});
mongoose.connection.on('error',(error)=>{
  console.log(`connection error:${error}`)
});

/*判断用户输入是否为空*/
router.use('/',(req,res,next)=>{
  let user=querystring.stringify(req.body)?req.body:req.query;
  req.user=user;
  if(!user.username){
    res.status(200).json({
      success:false,
      msg:'用户名不能为空！'
    })
  }else if(!user.password){
    res.status(200).json({
      success:false,
      msg:'密码不能为空！'
    })
  }else{
    next();
  }
})

/*连接数据库*/
router.use('/',function(req,res,next){

  mongoose.connect('mongodb://localhost:27017/test')
  .then(()=>{

    next();

  })
  .catch((err)=>{
    console.log(err)
  })
})

/*用户注册时手机号不能为空*/
router.use('/UserRegister',(req,res,next)=>{

  if(!req.user.phone){
    res.status(200).json({
      success:false,
      msg:'手机号不能为空！'
    })
  }else{
    next();
  }

})

/*判断用户名是否存在*/
router.use('/UserRegister',(req,res,next)=>{

  let user=req.user;
  userModel.findOne({username:user.username})
  .then((doc)=>{
    if(doc){
      res.status(200).json({success:false,msg:'用户名已存在，请重新注册！'})
    }else{
      let data=Buffer.from(req.user.username+req.user.password.substr(0,3));
      user.sessionToken=crypto.createHash('md5').update(data).digest('base64');
      next();
    }
  })
  .catch((err)=>{
    console.log(err)
    res.status(200).json({success:false,msg:'注册失败！'})
  })

})

/*把密码转成md5*/
router.use('/',function(req,res,next){

  req.user.password=crypto.createHash('md5').update(req.user.password).digest('base64');
  next();

})

/* user signup*/
router.all('/UserRegister',(req,res)=>{
  
  let user=new userModel(req.user);
  user.save((err,doc)=>{
    if(err){
      res.status(200).json({
        success:false,
        msg:'注册失败！'
      })
    }else{
      res.status(200).json({
        success:true,
        msg:'注册成功！',
        userInfo:{
          phone:req.user.phone,
          username:req.user.username,
          sessionToken:req.user.sessionToken
        }
      })
    }
  })

});

/*用户登入*/
router.all('/UserLogin',(req,res,next)=>{

  userModel.findOne({username:req.user.username})
  .then((doc)=>{
    if(doc){
      if(doc.password===req.user.password){
        res.status(200).json({success:true,msg:'登入成功!'})
      }else{
        res.status(200).json({success:false,msg:'密码错误！'})
      }
    }else{
      res.status(200).json({success:false,msg:'账户尚未注册！'})
    }
  })
  .catch((err)=>{

    res.status(200).json({success:false,msg:'登入失败！'});

  })

})

router.use('/',function(req,res,next){

  mongoose.disconnect();

})

module.exports = router;
