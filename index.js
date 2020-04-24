const express=require('express');
var socket=require('socket.io');

var app=express();


var port=process.env.PORT || 3000;
var server=app.listen(port, function(){
    console.log('listening on 3000');
});

app.use(express.static('public'));

var io=socket(server);

io.on('connection', function(socket){
    console.log('socket made');

    socket.on('chat', function(data){
        io.sockets.emit('chat',data);

        socket.on('typing', function(data){
            socket.broadcast.emit('typing',data);
        })
    })
});
