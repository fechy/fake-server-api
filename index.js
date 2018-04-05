const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const serverConfig = require('./.env.json');

const options = {
  key: serverConfig.ssl_key ? fs.readFileSync(serverConfig.ssl_key) : "",
  cert: serverConfig.ssl_cert ? fs.readFileSync(serverConfig.ssl_cert) : ""
};

const app = express();

const port = process.env.PORT || 8080; // If changed, it should also be changed in the server
const sslPort = process.env.SSL_PORT || 8443; // If changed, it should also be changed in the server

const MockServer = require('./mockServer');

const server = new MockServer();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Web GUI
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/status', (request, response) => {
    const statusResponse = {
        result: true,
        status: server.getStatus()
    };

    response.status(200)
            .header("Content-Type", "application/json")
            .send(JSON.stringify(statusResponse));
});

app.get('/uptime', (request, response) => {
    const statusResponse = {
        result: true,
        uptime: server.getUptime()
    };

    response.status(200)
            .header("Content-Type", "application/json")
            .send(JSON.stringify(statusResponse));
});

app.post('/status', (request, response) => {
    server.setStatus(request.body.status);

    const statusResponse = {
        result: true,
        status: server.getStatus()
    };

    response.status(200)
            .header("Content-Type", "application/json")
            .send(JSON.stringify(statusResponse));
});

http.createServer(app).listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});

https.createServer(options, app).listen(sslPort, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${sslPort}`);
});