const mongoose=require('mongoose');
const crypto=require('crypto');

connection=mongoose.connection;
mongoose.connect('mongodb://localhost:27017/test').then(function(){
  let userSchema=new mongoose.Schema({
    username:String,
    password:String,
    phone:String,
    registerDate:{type:Date,default:Date.now}
  });
  let userModel=mongoose.model('users',userSchema);

  let user=new userModel({
    username:'guaijie',
    password:'123456',
    phone:'18888888888',
  });

  userModel.find({}).cursor().next(function(err,doc){
    doc.password=crypto.createHash('md5').update(doc.password).digest('base64')
  })

})

connection.on('error',function(error){
  console.log(`connection error:${error}`)
});
connection.on('open',function(){
  console.log('db is connected')
});

/*let userSchema=new mongoose.Schema({
  username:String,
  password:String,
  phone:String,
  registerDate:{type:Date,default:Date.now}
});

userSchema.methods.crypto=function(cb){

  let hash=crypto.createHash('md5');

}

let userModel=mongoose.model('users',userSchema);

let user=new userModel({
  username:'guaijie',
  password:'123456',
  phone:'18888888888',
});*/

/*user.crypto().findOne({},function(err,doc){
  console.log(doc)
})*/


