const express = require('express');
const mongoose= require('mongoose');
const userModel=require('../../mongodb/userModel.js');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');


const userLogin=require('./userLogin.js');
const userRegister=require('./userRegister.js')
const usersList=require('./usersList.js')

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



/*用户登入*/
router.use('/userLogin',userLogin)
/*用户注册*/
router.use('/userRegister',userRegister)
/*获取注册用户信息列表*/
router.use('/usersList',usersList)




router.use('/',function(req,res,next){

  mongoose.disconnect();

})

module.exports = router;
