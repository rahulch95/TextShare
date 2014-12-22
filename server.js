var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);


    // request_lib = require('request'),
    // cheerio = require('cheerio'),

var clients = {};

io.sockets.on('connection', function(socket){
    
    socket.on('chat message', function(msg){
      io.sockets.in(socket.room).emit('chat message', msg);
    });
    socket.on('adduser', function(room_name){
      // store the room name in the socket session for this client
      socket.room = room_name;
      // send client to room 1
      socket.join(room_name);
      console.log("Room Name: " + room_name);
      // // echo to client they've connected
      // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
      // echo to room 1 that a person has connected to their room
      // io.emit('chat message', 'New user has connected to room a');
      socket.broadcast.to(room_name).emit('chat message', 'New user has connected to this room.');
    });
});

app.set('port', (process.env.PORT || 5000));

app.get('/b', function(request, response) {
  response.sendFile(__dirname + '/html/textpad.html');
});

// for now if i type localhost:5000/a it should open a new 
app.get('/a', function(request, response) {
  response.sendFile(__dirname + '/html/a.html');
});

server.listen(app.get('port'), function() {
    console.log("Node app is running at port: " + app.get('port'));
});

  // response.writeHead(200, {"Content-Type": "text/html"});
  // response.write("<!DOCTYPE \"html\">");
  // response.write("<html>");
  // response.write("<head>");
  // response.write("<title>Hello World Page</title>");
  // response.write("</head>");
  // response.write("<body>");
  // response.write("Hello World! 5000");
  // response.write("</body>");
  // response.write("</html>");
  // response.end();