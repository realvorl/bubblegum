const express = require('express');
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;
/*
/     Express Server Setup
*/
const app = express();

let changeLog = [];

app.use(express.static('public'));

const server = app.listen(3001, function () {
    console.log('Server up and running...🏃🏃🏃');
    console.log("Listening on port %s", server.address().port);
});

app.get("/changeLog", function (request, response) {
    let buba = JSON.stringify(changeLog);
//    console.log("returning this: " + buba);
    response.send(buba);
});

app.get("/graph", function (request, response) {
//    console.log("returning this: " + buba);
    response.sendfile('graph.html')
});

app.get("/check", function (request, response) {
    //console.log(`GET '/check'  ${Date()}`);
    const domain = decodeURIComponent(request.query.domain);
    const path = decodeURIComponent(request.query.path);
    const portfromfile = decodeURIComponent(request.query.port);
    // console.log(portfromfile + ' ################################# ')
    const checkPromise = new Promise(function(resolve, reject) {
        const options = {
            host: domain,
            port: portfromfile,
            method: "GET",
            path: path,
            followAllRedirects: true,
            rejectUnauthorized: false
        };

        const getReq = (portfromfile == 80 ? http : https).get(options, function (res) {
                resolve(res);
            });

        getReq.on("error",function (event) {
            reject(event);
        })
    });

    function logEntry(res) {
        let entry = {
            timestamp: (new Date()).getTime(),
            path: domain+"/"+path,
            status: res.statusCode
        };
        changeLog.push(entry);
        return entry;
    }

    checkPromise.then(function (res) {
        let entry = logEntry(res);
        console.log("+ " + entry.timestamp + " -> "+res.responseUrl + " :: " + entry.status);
        makeDecision(res.statusCode, response);
    });
    checkPromise.catch(function (err) {
        let entry = logEntry(response);
        console.log("something went wrong: " + err);
        makeDecision(500, response);
    })
});

const makeDecision = function (message, response) {
    response.status(message);
    response.send("");
};
