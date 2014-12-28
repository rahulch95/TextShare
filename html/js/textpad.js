$(document).ready(function() {


    var editor = ace.edit("editor");
	var current_message;
	var socket = io();
	var room = "";
	var modes;
	var colors;

    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/text");

	$.getJSON('../modes.json', function(all_modes) {
		modes = all_modes;
		$.each(all_modes, function(key, value) {
			$('#select-mode').append("<option>" + key  + "</option>");
		});
	});

	$.getJSON('../colors.json', function(all_colors) {
		colors = all_colors;
		$.each(all_colors, function(key, value) {
			$('#select-color-scheme').append("<option>" + key  + "</option>");
		});
	});


    $('#select-mode').change(function() {
    	str = "";
   	    $( "#select-mode option:selected" ).each(function() {
	      str += $( this ).text();
    	});
    	alert(str);
    	alert(modes[str]);
    	editor.getSession().setMode("ace/mode/" + modes[str]);
    });


    $('#select-color-scheme').change(function() {
    	str = "";
   	    $( "#select-color-scheme option:selected" ).each(function() {
	      str += $( this ).text();
    	});
    	alert(str);
    	alert(colors[str]);
    	editor.setTheme("ace/theme/" + colors[str]);
    });

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

	function sync(previous_message) {
		current_message = editor.getValue();

		if (current_message != previous_message) {
			socket.emit('chat message', current_message);
		}
		setTimeout(function() {sync(current_message);}, 1);
	};

	sync(editor.getValue());
	
});
