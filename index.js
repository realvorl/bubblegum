var express = require('express');
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;

/*
/     Express Server Setup
*/
var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
    console.log('Server up and running...🏃🏃🏃');
    console.log("Listening on port %s", server.address().port);
});

app.get("/", function (request, response) {
    //console.log(`GET '/dashboard' ${Date()}`);
    response.sendfile("dashboard.html");
});

app.get("/hosts2lookup", function (request, response) {
    //console.log(`GET '/hosts2lookup' ${Date()}`);
    response.sendfile("hosts.json");
});

app.get("/check", function (request, response) {
    //console.log(`GET '/check'  ${Date()}`);
    var domain = decodeURIComponent(request.query.domain);
    var path = decodeURIComponent(request.query.path);
    var portfromfile = decodeURIComponent(request.query.port);
    console.log(portfromfile + ' ################################# ')
    var filename = "";
    var checkPromise = new Promise(function(resolve, reject) {
        var options = {
            host: domain,
            port: portfromfile,
            method: "GET",
            path: path,
            followAllRedirects: true,
            rejectUnauthorized: false
        };

        var getReq = (portfromfile==80 ? http : https).get(options, function (res) {
                resolve(res);
            });

        getReq.on("error",function (event) {
            reject(event);
        })
    });
    checkPromise.then(function (res) {
        console.log(res.responseUrl + " :: " + res.statusCode);
        if (res.statusCode > 499) filename = "red.html";
        if (res.statusCode < 500) filename = "yellow.html";
        if (res.statusCode < 300) filename = "green.html";
        //console.log("filename: ", filename);
        makeDecision(filename, response);
    });
    checkPromise.catch(function (err) {
        console.log("something went wrong: " + err);
        makeDecision("red.html", response);
    })
});

var makeDecision = function (filename, response) {
    response.sendfile(filename);
};
