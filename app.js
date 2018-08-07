const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer=require('multer');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes/user.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'chatApp/dist/'));//设定视图的目录
app.set('view engine', 'jade');//设定模板引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(multer().any());
app.use(cookieParser());
/*只允许get和post方法*/
/*app.use((req,res,next)=>{

  if(req.method==='GET'||req.method==='POST'){
    next();
  }else{
    res.status(403).end('错误的请求方法','utf8');
  }

});*/


/*路由*/
app.use(express.static(path.join(__dirname, 'chatApp/dist/')));//设定前端静态资源路径
app.use('/', indexRouter);//匹配路由路径
app.use('/user', userRouter);//匹配路由路径

// catch 404 and forward to error handler
app.use(function(req, res, next) {//捕获404错误
  next(createError(404,'This page does not exist!'));
});

// error handler
app.use(function(err, req, res, next) {//错误处理
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(err.status==404){
    res.redirect('/')
  }else{
    console.log(err)
    res.end(err.status);
    
  }
});

module.exports = app;
