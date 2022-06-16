"use strict";

// Import modules
const fs = require("fs");
const http = require("http");
const https = require("https");

/**
 * Setup http protocol (general)
 * @param {object} app
 * @param {function} callback
 */
function general(app, callback) {
    const httpServer = http.createServer(app);
    const port = parseInt(process.env.HTTP_PORT);
    httpServer.listen(port, process.env.HTTP_HOSTNAME);
    callback({type: "general", hostname: process.env.HTTP_HOSTNAME, port});
}

/**
 * Setup https protocol (secure)
 * @param {object} app
 * @param {function} callback
 */
function secure(app, callback) {
    const credentials = {
        key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
        cert: fs.readFileSync(process.env.HTTPS_CERT_PATH),
    };
    const httpsServer = https.createServer(credentials, app);
    const port = parseInt(process.env.HTTPS_PORT);
    httpsServer.listen(port, process.env.HTTP_HOSTNAME);
    callback({type: "secure", hostname: process.env.HTTP_HOSTNAME, port});
}

// Detect protocols automatically
module.exports = function(app, callback) {
    if (process.env.HTTPS === "both") {
        general(app, callback);
        secure(app, callback);
    } else if (process.env.HTTPS === "only") {
        secure(app, callback);
    } else {
        general(app, callback);
    }
};
