"use strict";
// express.js is a web framework.

// Import express.js
const express = require("express");

// Export (function)
module.exports = (ctx) => {
    // Initialize app engine
    const app = express();

    // General middlewares
    app.use(require("request-ip").mw());
    app.use(require("../middlewares/auth")(ctx));

    // Request body parser
    app.use(express.urlencoded({extended: true}));

    // Optional middlewares
    if (process.env.HTTPS_REDIRECT === "yes") {
        app.use(require("../middlewares/https_redirect"));
    }
    if (process.env.HTTP_CORS === "yes") {
        // Check header "Origin"
        app.use(require("../middlewares/cors_origin"));
        // Do CORS handler
        const cors = require("cors");
        app.use(cors({origin: process.env.WEBSITE_URL}));
    }

    // Return app engine
    return app;
};
