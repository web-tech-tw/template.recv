"use strict";
// express.js is a web framework.

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
    if (process.env.IS_PUBLIC !== "yes") {
        // Check header "Origin"
        app.use(require("../middleware/origin"));
    }
    if (process.env.HTTPS_REDIRECT === "yes") {
        // Do https redirects
        app.use(require("../middleware/https_redirect"));
    }
    if (process.env.HTTP_CORS === "yes") {
        // Do CORS handler
        const cors = require("cors");
        app.use(cors({origin: process.env.WEBSITE_URL}));
    }

    // Return app engine
    return app;
};
