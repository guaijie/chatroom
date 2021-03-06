const mongoose=require('mongoose');
const crypto=require('crypto');


let userSchema=new mongoose.Schema({
  id:Number,
  username:String,
  password:String,
  phone:String,
  sessionToken:String,
  registerDate:{type:Date,default:Date.now},
  isOnline:{type:Boolean,default:false},
  portrait:{type:String,default:'http://placehold.it/30x30'}
});
userSchema.methods.crypto=function(cb){

  let hash=createHash('md5');

  return this.model('users').findOne().map(function(doc){
    doc.password=hash.update(doc.password).digest(64);
  })

}
let userModel=mongoose.model('users',userSchema);

module.exports=userModel;





let user=new userModel({
  username:'guaijie',
  password:'123456',
  phone:'18888888888',
});
