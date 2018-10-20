const express = require('express');
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;

/*
/     Express Server Setup
*/
const app = express();

const monitorMap = new Map();

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
    const prometheusLabel = domain.replace(".", "_") + ((path) ? ("_" + path) : "");
    // console.log(portfromfile + ' ################################# ')
    const checkPromise = new Promise(function (resolve, reject) {
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

        getReq.on("error", function (event) {
            reject(event);
        })
    });
    checkPromise.then(function (res) {

        makeDecision(prometheusLabel, res.statusCode, response);
    });
    checkPromise.catch(function (err) {
        console.log("something went wrong: " + err);
        makeDecision(prometheusLabel, 500, response);
    })
});

app.get("/metrics", function (req, res) {

    var help = "# HELP {1} The current http response code";
    var type = "# TYPE {1} gauge";
    var value = "{1} {2}";

    var allGauges = "";

    monitorMap.forEach(function (entry) {
        allGauges += help.replace("{1}", entry.label) + "\n";
        allGauges += type.replace("{1}", entry.label) + "\n";
        allGauges += value.replace("{1}", "M_" + entry.label).replace("{2}", entry.value) + "\n\n\n";
        console.log(allGauges);
    });

    res.set('Content-Type', "text/plain; version=0.0.4; charset=utf-8");
    res.send(allGauges);
})

const makeDecision = function (whichOne, message, response) {
    response.status(message);
    response.send("");
};
