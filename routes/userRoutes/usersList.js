const express = require('express');
const userModel=require('../../mongodb/userModel.js');
const router = express.Router();

router.all('/',(req,res,next)=>{

  let result={},username=req.query.username;
  userModel.find({username:{$ne:username}},{_id:0,password:0})
  .then(doc=>{
    console.log(doc)
    result.userList=doc;
    result.userTotalCount=doc.length;
    result.userOnlineCount=0;
    result.userOfflineCount=0;
    for(let user of doc){
      if(user.isOnline){
        result.userOnlineCount++
      }else{
        result.userOfflineCount++
      }
    }
    res.status(200).json({
      success:true,
      ...result
    })
    
  })
  .catch(err=>{
    res.status(500);
  })

})

module.exports = router