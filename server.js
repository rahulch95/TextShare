var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    io = require('socket.io').listen(server);

// set the port and view engine

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/html/', 'css'));

// connect to mongoose database

mongoose.connect('mongodb://username:password@ds063870.mongolab.com:63870/text');

// define model 
var text = mongoose.model('text', {
    id : String,
    value : String
});

// random url generator
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// every time there is a request for a connection from any socket do the following according to the required chat
io.sockets.on('connection', function(socket){

    // for the chat message send the chat to that socket's room
    socket.on('chat message', function(msg){
      var results;

      // update the value of the text in the database
      text.update({id: socket.room}, {value: msg}, { multi: true }, function(err, numAffected) {
        if (numAffected == 0)
        {
          console.log("No Such id found");
        }
      });
      io.sockets.to(socket.room).emit('chat message', msg);
    });

    // when a message with add_user is sent we need to add the user to our list of sockets and make it join the required room
    // store the room name (title of the page) in the socket session for this client
    socket.on('add_user', function(room_name){
      socket.room = room_name;
      socket.join(room_name);
      console.log("Room Name: " + room_name);
      var results;
      text.find({id : room_name}, function(err, texts) {
        if (texts.length < 1){
            text.create({
              id : room_name,
              value : "Default"
            });
            io.sockets.to(room_name).emit("chat message", "Default")
        }
        else
        {
          results = texts[0].value;
          io.sockets.to(room_name).emit('chat message', results);
        }
      });          
    });

    // generate a new url
    socket.on('new url', function(msg) {
      var randomUrl = makeid();
      var json_object = {};
      console.log("random Url: " + randomUrl);
      while (json_object[randomUrl])
      {
        randomUrl = makeid();
      };
      text.create({
            id : randomUrl,
            value : "Default"
      });
      text.find(function(err, texts) {
          json_object = texts;
          console.log("Texts: " + texts);
      });
      io.sockets.emit('new url generated', randomUrl);
    });    
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/html/index.html');
});

app.get('/:textId?', function(request, response) {
  var textId = request.params.textId;
  response.render(__dirname + '/html/index', {title: textId});
});

server.listen(app.get('port'), function() {
    console.log("Node app is running at port: " + app.get('port'));
});

