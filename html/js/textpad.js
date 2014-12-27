$(document).ready(function() {


    var editor = ace.edit("editor");

    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode("ace/mode/javascript");

	var socket = io();
	var room = "";

	// title name is sent from the server to socket when it is first connected (the html of textId)
	socket.on('connect', function() {
		var room = document.getElementById('textId').innerHTML;
		socket.emit('add_user', room);
		socket.room = room;
		i = 1;
	});

	// whenever "chat message" is received change the value of the text inside the editor.
	socket.on('chat message', function(msg){

		var x = editor.getCursorPosition();
		editor.setValue(msg, 1);
		editor.moveCursorTo(x.row, x.column, false);


	});

	var current_message;

	function sync(previous_message) {
		current_message = editor.getValue();

		if (current_message != previous_message) {
			socket.emit('chat message', current_message);
		}
		setTimeout(function() {sync(current_message);}, 1);
	};

	sync(editor.getValue());
	
});
