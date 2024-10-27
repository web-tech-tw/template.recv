"use strict";
// express.js is a web framework.

// Import config
const {getSplited, getEnabled} = require("../config");

// Import express.js
const express = require("express");

// Create middleware handlers
const middlewareAuth = require("../middleware/auth");

// Initialize app engine
const app = express();

// Register global middleware
app.use(middlewareAuth);

// Read config
const trustProxy = getSplited("TRUST_PROXY", ",");

const isEnabledRedirectHttpHttps = getEnabled("ENABLED_REDIRECT_HTTP_HTTPS");
const isEnabledCors = getEnabled("ENABLED_CORS");
const isEnabledCorsOriginCheck = getEnabled("ENABLED_CORS_ORIGIN_CHECK");

// Optional settings
if (trustProxy.length) {
    app.set("trust proxy", trustProxy);
}

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

// Export withAwait
exports.withAwait = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Export express for shortcut
exports.express = express;
