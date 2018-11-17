var express=require('express');
var ejs=require('ejs');
var app=express();
var flash=require('express-flash');
var route = require('./routes.js');
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.set('view engine',ejs);
app.use(flash());
app.use('/',route);
io.on('connection',function(socket){
    console.log('Hi niket,user connected');
    socket.on('chat message',function(msg){
        console.log('message: '+msg);
        io.emit('chat message',msg);
    })
    socket.on('disconnect',function(){
        console.log('Bye niket,I am going back');
    })
})
http.listen(8090,()=>{
    console.log("listening on port 8090");
})
