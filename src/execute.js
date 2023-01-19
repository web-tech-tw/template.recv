"use strict";

// Import modules
const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");

// Import config
const {getMust} = require("./config");

/**
 * Setup http protocol (general)
 * @param {object} app
 * @param {function} callback
 */
function general(app, callback) {
    const options = {};
    const httpServer = http.createServer(options, app);
    const port = parseInt(getMust("HTTP_PORT"));
    httpServer.listen(port, getMust("HTTP_HOSTNAME"));
    callback({type: "general", hostname: getMust("HTTP_HOSTNAME"), port});
}

/**
 * Setup https protocol (secure)
 * @param {object} app
 * @param {function} callback
 */
function secure(app, callback) {
    const options = {
        key: fs.readFileSync(getMust("HTTPS_KEY_PATH")),
        cert: fs.readFileSync(getMust("HTTPS_CERT_PATH")),
    };
    const httpsServer = https.createServer(options, app);
    const port = parseInt(getMust("HTTPS_PORT"));
    httpsServer.listen(port, getMust("HTTP_HOSTNAME"));
    callback({type: "secure", hostname: getMust("HTTP_HOSTNAME"), port});
}

// Detect protocols automatically
module.exports = function(app, callback) {
    if (getMust("HTTPS") === "both") {
        general(app, callback);
        secure(app, callback);
    } else if (getMust("HTTPS") === "only") {
        secure(app, callback);
    } else {
        general(app, callback);
    }
};
