"use strict";
// express.js is a web framework.

// Import express.js
const express = require('express');

// Export (function)
module.exports = (ctx) => {
    // Initialize App Engine
    const app = express();

    // General Middlewares
    app.use(require('request-ip').mw());
    app.use(require('../middlewares/auth')(ctx));

    // Request Body Parser
    app.use(express.urlencoded({extended: true}));

    // Optional Middlewares
    if (process.env.HTTPS_REDIRECT === 'yes') {
        app.use(require('../middlewares/https_redirect'));
    }
    if (process.env.HTTP_CORS === 'yes') {
        const cors = require('cors');
        app.use(cors({origin: process.env.WEBSITE_URL}));
    }

    // Return App Engine
    return app;
};
