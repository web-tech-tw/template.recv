"use strict";

const express = require('express');
const request_ip = require('request-ip');

module.exports = (ctx) => {
    const auth = require('../middlewares/auth')(ctx);

    const app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(request_ip.mw());
    app.use(auth);

    if (process.env.HTTP_CORS === 'yes') {
        const cors = require('cors');
        app.use(cors({origin: process.env.WEBSITE_URL}));
    }

    return app;
};
