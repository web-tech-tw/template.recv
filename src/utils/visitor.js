"use strict";
// The simple toolbox for fetch visitor information from HTTP request.

const {
    isProduction,
} = require("../config");

const uaParser = require("ua-parser-js");

/**
 * Get IP Address.
 * @module visitor
 * @function
 * @param {object} req the request
 * @return {string} the IP Address
 */
function getIPAddress(req) {
    if (!isProduction()) {
        return "127.0.0.1";
    }
    return req.ip;
}

/**
 * Get User-Agent.
 * @module visitor
 * @function
 * @param {object} req the request
 * @param {boolean} isShort return short code instead
 * @return {string} the User-Agent
 */
function getUserAgent(req, isShort=false) {
    const userAgent = req.header("user-agent");
    if (!userAgent) {
        return "Unknown";
    }

    if (!isShort) {
        return userAgent;
    }

    const uaParsed = uaParser(userAgent);
    const {name: browserName} = uaParsed.browser;
    const {name: osName} = uaParsed.os;
    return [browserName, osName].join(" ");
}

// Export (object)
module.exports = {
    getIPAddress,
    getUserAgent,
};
