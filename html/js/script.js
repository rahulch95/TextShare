var socket = io();
var room = $('title').val();

//when ever something is recieved with title as "chat message" is recieved append msg to messages
socket.on('chat message', function(msg){
	socket.join(room);
	$('#messages').append($('<li>').text(msg));
});

// whenever something is sent emit it to room
$('form').submit(function(){
	var data = $('#m').val();

	socket.emit('chat message', data);
	socket.to(room).emit('chat message', data);
	alert(data);
	$('#m').val('');
	return false;
});

