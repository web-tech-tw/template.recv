"use strict";
// express.js is a web framework.

// Import config
const {getMust, getEnabled} = require("../config");

// Import express.js
const express = require("express");

// Export (function)
module.exports = (ctx) => {
    // Initialize app engine
    const app = express();

    // General middleware
    app.use(require("request-ip").mw());
    app.use(require("../middleware/auth")(ctx));

    // Request body parser
    app.use(express.urlencoded({extended: true}));

    // Optional middleware
    if (getEnabled("ENABLED_REDIRECT_HTTP_HTTPS")) {
        // Do https redirects
        app.use(require("../middleware/https_redirect"));
    }
    if (getEnabled("ENABLED_CORS")) {
        // Do global CORS handler
        const cors = require("cors");
        app.use(cors({
            origin: getMust("CORS_ORIGIN"),
        }));
        if (getEnabled("ENABLED_CORS_ORIGIN_CHECK")) {
            // Check header "Origin"
            app.use(require("../middleware/origin"));
        }
    }

    // Return app engine
    return app;
};
