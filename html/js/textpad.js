$(document).ready(function() {

	// set size of textarea
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $('#textarea').css({'width':windowWidth ,'height':windowHeight });


	var socket = io();
	var room = "b";

	// title name is sent from the server to socket when it is first connected
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		var room = document.getElementById('textId').innerHTML;
		socket.emit('add_user', room);
	});

	//when ever something is recieved with title as "chat message" is recieved append msg to messages
	socket.on('chat message', function(msg){
		// $('#messages').append($('<li>').text(msg));
		var cursorPosition = $('#textarea').getCursorPosition() || 0;
		$('#textarea').val(msg);
		setCaretToPos(document.getElementById("textarea"), cursorPosition);

	});

	$('#textarea').change(function(){
		socket.emit('chat message', $('#textarea').val());
	});
	jQuery.fn.extend({
		getCursorPosition: function() {
		        var el = $(this).get(0);
		        var pos = 0;
		        if('selectionStart' in el) {
		            pos = el.selectionStart;
		        } else if('selection' in document) {
		            el.focus();
		            var Sel = document.selection.createRange();
		            var SelLength = document.selection.createRange().text.length;
		            Sel.moveStart('character', -el.value.length);
		            pos = Sel.text.length - SelLength;
		        }
		        return pos;
		    }
	});
	function setSelectionRange(input, selectionStart, selectionEnd) {
	  if (input.setSelectionRange) {
	    input.focus();
	    input.setSelectionRange(selectionStart, selectionEnd);
	  }
	  else if (input.createTextRange) {
	    var range = input.createTextRange();
	    range.collapse(true);
	    range.moveEnd('character', selectionEnd);
	    range.moveStart('character', selectionStart);
	    range.select();
	  }
	}

	function setCaretToPos (input, pos) {
	  setSelectionRange(input, pos, pos);
	}
});