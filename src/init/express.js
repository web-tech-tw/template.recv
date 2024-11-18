"use strict";
// express.js is a web framework.

// Import modules
const express = require("express");
const {getSplited, getEnabled} = require("../config");

// Initialize app engine
const app = express();

// Register global middleware
const middlewareAuth = require("../middleware/auth");
// Do authentication
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

/**
 * Composable application.
 * @return {express.Application} The express app.
 */
exports.useApp = () => app;

/**
 * Wrap express async handler with Promise.
 * @param {express.Handler} handler - The express handler.
 * @return {express.Handler} The wrapped express handler.
 */
exports.withAwait = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};

// Export express for shortcut
exports.express = express;
