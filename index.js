var express = require('express');
var http = require('follow-redirects').http;
var url = require('url')
var tcpp = require('tcp-ping');

/*
/     Express Server Setup
*/
var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
  console.log('Server up and running...🏃🏃🏻');
  console.log("Listening on port %s", server.address().port);
});

app.get("/", function (request, response) {
  console.log(`GET '/dashboard' ${Date()}`);
  response.sendfile("dashboard.html");
});

app.get("/hosts2lookup", function (request, response) {
  console.log(`GET '/hosts2lookup' ${Date()}`);
  response.sendfile("hosts.json");
});

app.get("/check", function (request, response) {
  try {
    console.log(`GET '/check'  ${Date()}`);
    var domain = decodeURIComponent(request.query.domain);
    var path = decodeURIComponent(request.query.path);
    tcpp.probe(domain, 80, function(err, available) {
      console.log("tcpp err: ", err + " / " + available)
      if (available) {
        var options = {
          host: domain,
          port: 80,
          method:"GET",
          path: path,
          followAllRedirects: true
        };
        var filename = "";
        http.get(options, function(res) {
          console.log("STATUS CODE: ", res.statusCode);
          if (res.statusCode > 499) filename = "red.html";
          if (res.statusCode < 500) filename = "yellow.html";
          if (res.statusCode < 300) filename = "green.html";
          console.log("filename: ", filename);
          makeDecision(filename, response);
        });
      } else {
        makeDecision("red.html", response);
      }
    });
  } catch (e) {
    console.log("serious fail: ", e);
  }
});

var makeDecision = function(filename, response) {
  response.sendfile(filename);
}
