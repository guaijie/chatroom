const express = require('express');
const userModel=require('../../mongodb/userModel.js');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');


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


/*用户登入*/
router.all('/',(req,res,next)=>{
  let Conditions={registerDate:0};
  userModel.findOne({username:req.user.username},Conditions)
  .then((doc)=>{
    if(doc){
      password=crypto.createHash('md5').update(req.user.password).digest('base64');
      if(doc.password===password){
        userInfo=doc.toObject();
        userInfo.password=undefined;
        res.status(200).json({success:true,msg:'登入成功!',userInfo})
      }else{
        res.status(200).json({success:false,msg:'密码错误！'})
      }
    }else{
      res.status(200).json({success:false,msg:'账户尚未注册！'})
    }
  })
  .catch((err)=>{

    res.status(500);

  })

})

module.exports = router

