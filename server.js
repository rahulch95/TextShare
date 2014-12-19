var express = require('express'),
    app = express(),
    request_lib = require('request'),
    cheerio = require('cheerio');
app.set('port', (process.env.PORT || 5000));
// var server = http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/html"});
//   response.write("<!DOCTYPE \"html\">");
//   response.write("<html>");
//   response.write("<head>");
//   response.write("<title>Hello World Page</title>");
//   response.write("</head>");
//   response.write("<body>");
//   response.write("Hello World! 5000");
//   response.write("</body>");
//   response.write("</html>");
//   response.end();
// });
// var sendComments = function(response) {
//   response.writeHead(200, {"Content-Type": "text/html"});
//   response.write("<!DOCTYPE \"html\">");
//   response.write("<html>");
//   response.write("<head>");
//   response.write("<title>Hello World Page</title>");
//   response.write("</head>");
//   response.write("<body>");
//   response.write("Hello World! 5000");
//   response.write("</body>");
//   response.write("</html>");
//   response.end();
// });

app.get('/', function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE \"html\">");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Hello World! 5000");
  response.write("</body>");
  response.write("</html>");
  response.end();
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});