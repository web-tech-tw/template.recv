"use strict";
// Check the header "Origin" in request is equal to CORS_ORIGIN,
// if not, interrupt it.

// Import config
const {isProduction, getMust} = require("../config");

// Import StatusCodes
const {StatusCodes} = require("http-status-codes");

// Export (function)
module.exports = (req, res, next) => {
    const actualUrl = req.header("Origin");
    const expectedUrl = getMust("CORS_ORIGIN");
    if (actualUrl !== expectedUrl) {
        if (!isProduction()) {
            // Debug message
            console.warn(
                "CORS origin header mismatch:",
                `actual "${actualUrl}"`,
                `expected "${expectedUrl}"`,
            );
        }
        res.sendStatus(StatusCodes.FORBIDDEN);
        return;
    }

    // Call next middleware
    next();
};
