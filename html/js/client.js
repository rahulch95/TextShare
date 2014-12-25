$(document).ready(function(){

	var socket = io();

	$("#getUrl").parent().on("click","#getUrl", function () {
		$(this).attr("id", "waiting");
		$(this).text('');
	   	// $(this).toggleClass("animation");
	   	// $(this).append($('<button class="animation2"></button>'));
		// emit the new url needed text

		setTimeout(function () {
		   	// $('#waiting').toggleClass("animation");
		   	$('#waiting').attr("id", "getUrl");
			socket.emit('new url');
			
		}, 5500);
	}).on("click","#take_me_there",function () {
		$('#take_me_there').text('');
	    window.location.replace(document.URL + $('#your_new_link').text());
	});

	socket.on('new url generated', function(msg){

		// change the id of the button
		$('#getUrl').attr("id", "take_me_there");
		$('#take_me_there').text('Take me there');
		$('#your_new_link').text(msg);
		$('#your_new_link').val(msg);
	});

});