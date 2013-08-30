var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(86);


var io = require('socket.io').listen(85);
io.sockets.on('connection', function (socket) {
	var room = null;
	socket.on('subscribe', function(data) { 
		room = data.room; 
		socket.join(data.room); 
		socket.broadcast.to(room).emit('test', {madan:123});
	});
	socket.on('unsubscribe', function(data) {room = null; socket.leave(data.room); })
	
	socket.on('broadcast', function (data) {
		 socket.broadcast.to(room).emit('imgdata', data) //emit to 'room' except this socket
	});		
	socket.on('news', function (data) {
		 socket.broadcast.to(room).emit('imgdata', data) //emit to 'room' except this socket
	});	
});