var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    ejs = require('ejs');
    io = require('socket.io').listen(server);
    // request_lib = require('request'),
    // cheerio = require('cheerio'),

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
var clients = {};

io.sockets.on('connection', function(socket){

    socket.on('chat message', function(msg){
      io.sockets.to(socket.room).emit('chat message', msg);
    });

    // when a message with add_user is sent we need to add the user to our list of sockets and make it join the required room
    socket.on('add_user', function(room_name){
      // store the room name (title of the page) in the socket session for this client
      socket.room = room_name;
      socket.join(room_name);
      console.log("Room Name: " + room_name);
      // socket.broadcast.to(room_name).emit('chat message', 'New user has connected to this room.');
    });
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/html/index.html');
});

app.get('/:textId?', function(request, response) {
  var textId = request.params.textId;
  response.render(__dirname + '/html/index', {title: textId});

});

// app.get('/b', function(request, response) {
//   response.sendFile(__dirname + '/html/textpad.html');
// });

// // for now if i type localhost:5000/a it should open a.html
// app.get('/a', function(request, response) {
//   response.sendFile(__dirname + '/html/a.html');
// });

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