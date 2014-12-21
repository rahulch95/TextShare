var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    request_lib = require('request'),
    cheerio = require('cheerio'),
    io = require('socket.io')(server);

io.on('connection', function(socket){
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/html/textpad.html');

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