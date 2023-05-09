"use strict";
// express.js is a web framework.

// Import config
const {getEnabled} = require("../config");

// Import express.js
const express = require("express");

// Initialize app engine
const app = express();

// Create middleware handlers
const middlewareRequestIp = require("request-ip").mw();
const middlewareAuth = require("../middleware/auth");

// Register global middleware
app.use(middlewareRequestIp);
app.use(middlewareAuth);

// Read config
const isEnabledRedirectHttpHttps = getEnabled("ENABLED_REDIRECT_HTTP_HTTPS");
const isEnabledCors = getEnabled("ENABLED_CORS");
const isEnabledCorsOriginCheck = getEnabled("ENABLED_CORS_ORIGIN_CHECK");

// Optional middleware
if (isEnabledRedirectHttpHttps) {
    const middlewareHttpsRedirect = require("../middleware/https_redirect");
    // Do https redirects
    app.use(middlewareHttpsRedirect);
}
if (isEnabledCors) {
    const middlewareCORS = require("../middleware/cors");
    // Do CORS handles
    app.use(middlewareCORS);
}
if (isEnabledCors && isEnabledCorsOriginCheck) {
    const middlewareOrigin = require("../middleware/origin");
    // Check header "Origin" for CORS
    app.use(middlewareOrigin);
}

// Export useFunction
exports.useApp = () => app;

// Export express for shortcut
exports.express = express;
