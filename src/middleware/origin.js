"use strict";
// Check the header "Origin" in request is equal to CORS_ORIGIN,
// if not, interrupt it.

// Import config
const {getMust} = require("../config");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
module.exports = (req, res, next) => {
    const originUrl = req.header("Origin");
    if (originUrl !== getMust("CORS_ORIGIN")) {
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }
    next();
};
