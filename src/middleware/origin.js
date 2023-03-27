"use strict";
// Check the header "Origin" in request is equal to CORS_ORIGIN,
// if not, interrupt it.

// Import config
const {isProduction, getMust} = require("../config");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
module.exports = (req, res, next) => {
    const actualUrl = getMust("CORS_ORIGIN");
    const expectUrl = req.header("Origin");
    if (actualUrl !== expectUrl) {
        if (!isProduction()) {
            console.warn(
                "CORS origin header mismatch: ",
                `actual "${actualUrl}"`,
                `expect "${expectUrl}"`,
            );
        }
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }

    // Call next middleware
    next();
};
