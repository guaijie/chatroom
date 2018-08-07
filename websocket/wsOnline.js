/*const mongoose= require('mongoose');
const userModel=require('../mongodb/userModel.js');

module.exports=function(req,res,next){

  var result={};
  mongoose.connect('mongodb://localhost:27017/test')
  .then(()=>{
    userModel.find({},{_id:0,username:1,isOnline:1})
    .then(doc=>{

      result.userList=doc;
           
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
}*/