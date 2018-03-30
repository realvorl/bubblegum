const express = require('express');
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;
/*
/     Express Server Setup
*/
const app = express();

app.use(express.static('public'));

const server = app.listen(3001, function () {
    console.log('Server up and running...🏃🏃🏃');
    console.log("Listening on port %s", server.address().port);
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
    checkPromise.then(function (res) {
        console.log(res.responseUrl + " :: " + res.statusCode);
        makeDecision(res.statusCode, response);
    });
    checkPromise.catch(function (err) {
        console.log("something went wrong: " + err);
        makeDecision(500, response);
    })
});

const makeDecision = function (message, response) {
    response.status(message);
    response.send("");
};
